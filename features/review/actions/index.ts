'use server';

import { apiClient } from '@/config/api-client';
import { getAccount } from '@/features/account/profile/actions';
import { UserAvatarSchema } from '@/features/account/profile/types';
import { isUserAvatarSchema } from '@/features/account/profile/utils';
import { UserSchema } from '@/features/account/types';
import { isUserSchema } from '@/features/account/utils';
import { ImageSchema, ProductSchema } from '@/features/product/types';
import { isImageSchema, isProductSchema } from '@/features/product/utils';
import { isClientError } from '@/utils/error';
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
        include: 'product.images,user.images,user.avatars',
        ...params?.query
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { tags: [TAGS.reviews] }, cache: 'no-store' });
    }
  });

  if (error) {
    throw error;
  }

  const { data: reviews, meta, included } = data;

  const users = included?.filter(isUserSchema) || [];
  const products = included?.filter(isProductSchema) || [];
  const images = included?.filter(isImageSchema) || [];
  const avatars = included?.filter(isUserAvatarSchema) || [];

  return {
    data: reshapeReviews({
      reviews,
      users,
      products,
      images,
      avatars
    }),
    meta
  };
}

function reshapeReviews({
  reviews,
  users,
  products,
  images,
  avatars
}: {
  reviews: ReviewSchema[];
  users: UserSchema[];
  products: ProductSchema[];
  images: ImageSchema[];
  avatars: UserAvatarSchema[];
}) {
  const userMap = new Map(users.map((user) => [user.id, user]));
  const productMap = new Map(products.map((product) => [product.id, product]));
  const imageMap = new Map(images.map((image) => [image.id, image]));
  const avatarMap = new Map(avatars.map((avatar) => [avatar.id, avatar]));

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

    const userAvatars = user?.relationships?.avatars?.data || [];
    const avatar = userAvatars.length > 0 ? avatarMap.get(userAvatars[0].id) : undefined;

    return {
      ...review,
      user,
      product,
      images,
      avatar
    };
  });
}

export async function saveReviews(
  reviews: {
    productId: string;
    ratings: {
      texture: number;
      finish: number;
      effectiveness: number;
      longevity: number;
      usability: number;
    };
    review?: string;
    reviewId?: string;
  }[]
) {
  const results = await Promise.all(
    reviews.map((review) =>
      review.reviewId
        ? updateReview({
            productId: review.productId,
            reviewId: review.reviewId,
            ratings: {
              texture: review.ratings.texture,
              finish: review.ratings.finish,
              effectiveness: review.ratings.effectiveness,
              longevity: review.ratings.longevity,
              usability: review.ratings.usability
            },
            review: review.review
          })
        : writeReview({
            productId: review.productId,
            ratings: {
              texture: review.ratings.texture,
              finish: review.ratings.finish,
              effectiveness: review.ratings.effectiveness,
              longevity: review.ratings.longevity,
              usability: review.ratings.usability
            },
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

async function updateReview({
  productId,
  reviewId,
  ratings,
  review
}: {
  productId: string;
  reviewId: string;
  ratings: {
    texture: number;
    finish: number;
    effectiveness: number;
    longevity: number;
    usability: number;
  };
  review?: string;
}) {
  try {
    const { error } = await apiClient.PATCH(`/api/v2/storefront/reviews/{id}`, {
      body: {
        review: {
          product_id: productId,
          texture_rating: ratings.texture,
          finish_rating: ratings.finish,
          effectiveness_rating: ratings.effectiveness,
          longevity_rating: ratings.longevity,
          usability_rating: ratings.usability,
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

async function writeReview({
  productId,
  ratings,
  review
}: {
  productId: string;
  ratings: {
    texture: number;
    finish: number;
    effectiveness: number;
    longevity: number;
    usability: number;
  };
  review?: string;
}) {
  try {
    const { error } = await apiClient.POST('/api/v2/storefront/reviews', {
      body: {
        review: {
          product_id: productId,
          texture_rating: ratings.texture,
          finish_rating: ratings.finish,
          effectiveness_rating: ratings.effectiveness,
          longevity_rating: ratings.longevity,
          usability_rating: ratings.usability,
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

export async function addReviewFeedback({ review_id }: { review_id: string }) {
  try {
    const { data, error } = await apiClient.POST(
      '/api/v2/storefront/reviews/{review_id}/feedbacks',
      {
        params: {
          path: {
            review_id
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
      message: 'フィードバックを追加しました',
      data: data?.data
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

export async function addReviewComment({
  review_id,
  content
}: {
  review_id: string;
  content: string;
}) {
  try {
    const { error } = await apiClient.POST('/api/v2/storefront/reviews/{review_id}/comments', {
      params: {
        path: {
          review_id
        }
      },
      body: {
        review_comment: {
          content
        }
      }
    });

    if (error) {
      throw error;
    }

    revalidateTag(TAGS.reviews);
    return {
      success: true,
      message: 'コメントを投稿しました'
    };
  } catch (error) {
    console.error('Comment post error:', error);

    if (isClientError(error)) {
      if (error.error === 'URLを含むコメントは投稿できません') {
        return {
          success: false,
          message: 'URLを含むコメントは投稿できません'
        };
      }
    }

    return {
      success: false,
      message: 'コメントの投稿に失敗しました'
    };
  }
}

export async function getReviewComments({
  review_id,
  page = 1,
  per_page = 10
}: {
  review_id: string;
  page?: number;
  per_page?: number;
}) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/reviews/{review_id}/comments', {
    params: {
      path: {
        review_id
      },
      query: {
        page,
        per_page,
        include: 'user,user.avatars'
      }
    }
  });

  if (error) {
    throw error;
  }

  const users = data.included?.filter(isUserSchema) || [];
  const avatars = data.included?.filter(isUserAvatarSchema) || [];

  const reshapedComments = data?.data?.map((comment) => {
    const userId = comment?.relationships?.user?.data?.id;
    const user = users.find((u) => u.id === userId);

    const userAvatars = user?.relationships?.avatars?.data || [];
    const avatar =
      userAvatars.length > 0 ? avatars.find((a) => a.id === userAvatars[0].id) : undefined;

    const avatarUrl = avatar
      ? avatar.attributes?.styles?.[avatar.attributes.styles.length - 1]?.url
      : undefined;

    return {
      ...comment,
      user: user
        ? {
            ...user,
            avatar: {
              url: avatarUrl || '/placeholder-product-image.png'
            }
          }
        : undefined
    };
  });

  return {
    data: reshapedComments,
    meta: data.meta,
    links: data.links
  };
}

export async function addCommentFeedback({
  review_id,
  comment_id
}: {
  review_id: string;
  comment_id: string;
}) {
  try {
    const { error } = await apiClient.POST(
      '/api/v2/storefront/reviews/{review_id}/comments/{id}/feedbacks',
      {
        params: {
          path: {
            review_id,
            id: comment_id
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
      message: 'フィードバックを追加しました'
    };
  } catch (error) {
    console.error('Comment feedback add error:', error);
    return {
      success: false,
      message: 'フィードバックの追加に失敗しました'
    };
  }
}

export async function removeCommentFeedback({
  review_id,
  comment_id
}: {
  review_id: string;
  comment_id: string;
}) {
  try {
    const { error } = await apiClient.DELETE(
      '/api/v2/storefront/reviews/{review_id}/comments/{id}/feedbacks',
      {
        params: {
          path: {
            review_id,
            id: comment_id
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
    console.error('Comment feedback remove error:', error);
    return {
      success: false,
      message: 'フィードバックの削除に失敗しました'
    };
  }
}
