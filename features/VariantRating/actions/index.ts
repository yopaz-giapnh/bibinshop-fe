'use server';

import { apiClient } from '@/config/api-client';
import { TAGS } from '../constants';

export async function postVariantRating(variantId: string, rating: boolean) {
  const { data, error } = await apiClient.POST('/api/v2/storefront/variant_ratings', {
    body: {
      variant_rating: {
        variant_id: variantId,
        rating: rating
      }
    },
    fetch: (request) => {
      return fetch(request, {
        next: {
          tags: [TAGS.variantRatings]
        }
      });
    }
  });

  if (error) {
    throw error;
  }

  return data;
}
