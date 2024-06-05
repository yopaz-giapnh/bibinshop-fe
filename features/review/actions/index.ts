'use server';

import { apiClient } from '@/config/api-client';
import { UserSchema } from '@/features/account/types';
import { isUser } from '@/features/account/utils';
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

  const users = included?.filter(isUser) || [];

  return {
    data: reshapeReviews(reviews, users),
    meta
  };
}

function reshapeReviews(reviews: ReviewSchema[], users: UserSchema[]) {
  return reviews.map((review) => {
    return {
      ...review,
      user: users?.find((user) => user.id === review.relationships.user?.data?.id)
    };
  });
}
