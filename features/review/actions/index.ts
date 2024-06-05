'use server';

import { apiClient } from '@/config/api-client';
import { UserSchema } from '@/features/account/types';
import { isUserSchema } from '@/features/account/utils';
import { ProductSchema } from '@/features/product/types';
import { isProductSchema } from '@/features/product/utils';
import { TAGS } from '../constants';
import { ReviewListParameters, ReviewSchema } from '../types';

export async function getReviews(params?: ReviewListParameters) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/reviews', {
    params: {
      ...params,
      query: {
        include: 'product,user.images',
        ...params?.query
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { tags: [TAGS.reviews] } });
    }
  });

  if (error) {
    throw new Error(error.error);
  }

  const { data: reviews, meta, included } = data;

  const users = included?.filter(isUserSchema) || [];
  const products = included?.filter(isProductSchema) || [];

  return {
    data: reshapeReviews({
      reviews,
      users,
      products
    }),
    meta
  };
}

function reshapeReviews({
  reviews,
  users,
  products
}: {
  reviews: ReviewSchema[];
  users: UserSchema[];
  products: ProductSchema[];
}) {
  const userMap = new Map(users.map((user) => [user.id, user]));
  const productMap = new Map(products.map((product) => [product.id, product]));

  return reviews.map((review) => {
    return {
      ...review,
      user: userMap.get(review.relationships.user?.data?.id),
      product: productMap.get(review.relationships.product?.data?.id)
    };
  });
}
