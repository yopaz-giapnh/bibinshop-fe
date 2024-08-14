'use server';

import { apiClient } from '@/config/api-client';
import { getAccount } from '@/features/account/profile/actions';
import { UserSchema } from '@/features/account/types';
import { isUserSchema } from '@/features/account/utils';
import { ImageSchema, ProductSchema } from '@/features/product/types';
import { isImageSchema, isProductSchema } from '@/features/product/utils';
import { revalidateTag } from 'next/cache';
import { TAGS } from '../constants';
import { ReviewListParameters, ReviewSchema } from '../types';

export async function getMyReviews(params?: ReviewListParameters) {
  const user = await getAccount();
  return await getReviews({
    ...params,
    query: {
      ...params?.query,
      'filter[user_ids]': user.id
    }
  });
}

export async function getReviews(params?: ReviewListParameters) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/reviews', {
    params: {
      ...params,
      query: {
        include: 'product.images,user.images',
        ...params?.query
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { revalidate: 86400, tags: [TAGS.reviews] } });
    }
  });

  if (error) {
    throw error;
  }

  const { data: reviews, meta, included } = data;

  const users = included?.filter(isUserSchema) || [];
  const products = included?.filter(isProductSchema) || [];
  const images = included?.filter(isImageSchema) || [];

  return {
    data: reshapeReviews({
      reviews,
      users,
      products,
      images
    }),
    meta
  };
}

function reshapeReviews({
  reviews,
  users,
  products,
  images
}: {
  reviews: ReviewSchema[];
  users: UserSchema[];
  products: ProductSchema[];
  images: ImageSchema[];
}) {
  const userMap = new Map(users.map((user) => [user.id, user]));
  const productMap = new Map(products.map((product) => [product.id, product]));
  const imageMap = new Map(images.map((image) => [image.id, image]));

  return reviews.map((review) => {
    const user = review.relationships.user?.data?.id
      ? userMap.get(review.relationships.user.data.id)
      : undefined;
    const product = review.relationships.product?.data?.id
      ? productMap.get(review.relationships.product.data.id)
      : undefined;
    const images = product
      ? product.relationships.images?.data
          ?.map((image) => imageMap.get(image?.id || ''))
          .filter(isImageSchema) || []
      : [];

    return {
      ...review,
      user,
      product,
      images
    };
  });
}

export async function saveReviews(
  prevState: { success: boolean; message: string } | null,
  reviews: { productId: string; rating: number; review?: string; reviewId?: string }[]
) {
  const results = await Promise.all(
    reviews.map((review) =>
      review.reviewId
        ? updateReview({
            productId: review.productId,
            reviewId: review.reviewId,
            rating: review.rating,
            review: review.review
          })
        : writeReview({
            productId: review.productId,
            rating: review.rating,
            review: review.review
          })
    )
  );

  revalidateTag(TAGS.reviews);

  if (results.some((result) => result.success)) {
    return {
      success: true,
      message: 'レビューを投稿しました'
    };
  } else {
    return {
      success: false,
      message: 'レビューの投稿に失敗しました'
    };
  }
}

async function writeReview({
  productId,
  rating,
  review
}: {
  productId: string;
  rating: number;
  review?: string;
}) {
  try {
    const { error } = await apiClient.POST('/api/v2/storefront/reviews', {
      body: {
        review: {
          product_id: productId,
          rating,
          review
        }
      }
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'レビューを投稿しました'
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'レビューの投稿に失敗しました'
    };
  }
}

async function updateReview({
  productId,
  reviewId,
  rating,
  review
}: {
  productId: string;
  reviewId: string;
  rating: number;
  review?: string;
}) {
  try {
    const { error } = await apiClient.PATCH(`/api/v2/storefront/reviews/{id}`, {
      body: {
        review: {
          product_id: productId,
          rating,
          review
        }
      },
      params: {
        path: {
          id: reviewId
        }
      }
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'レビューを更新しました'
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'レビューの更新に失敗しました'
    };
  }
}

export async function addReviewFeedback({ review_id }: { review_id: string }) {
  try {
    const { error } = await apiClient.POST('/api/v2/storefront/reviews/{review_id}/feedbacks', {
      params: {
        path: {
          review_id
        }
      }
    });

    if (error) {
      throw error;
    }

    revalidateTag(TAGS.reviews);
    return {
      success: true,
      message: 'フィードバックを追加しました'
    };
  } catch (error) {
    console.error('フィードバック追加エラー:', error);
    return {
      success: false,
      message: 'フィードバックの追加に失敗しました'
    };
  }
}

export async function removeReviewFeedback({ review_id, id }: { review_id: string; id: string }) {
  try {
    const { error } = await apiClient.DELETE(
      '/api/v2/storefront/reviews/{review_id}/feedbacks/{id}',
      {
        params: {
          path: {
            review_id,
            id
          }
        }
      }
    );

    if (error) {
      throw error;
    }
    revalidateTag(TAGS.reviews);

    return {
      success: true,
      message: 'フィードバックを削除しました'
    };
  } catch (error) {
    console.error('フィードバック削除エラー:', error);
    return {
      success: false,
      message: 'フィードバックの削除に失敗しました'
    };
  }
}
