'use server';

import { apiClient } from '@/config/api-client';
import { isNotFound } from '@/utils/api';
import { TAGS } from '../constants';

export async function getCoupons({ cache = 'no-store' }: { cache?: RequestCache } = {}) {
  const { response, error, data } = await apiClient.GET('/api/v2/storefront/coupons', {
    params: {},
    fetch: (request) => {
      return fetch(request, { next: { tags: [TAGS.coupon] }, cache });
    }
  });

  if (isNotFound(response)) {
    return null;
  }

  if (error) {
    throw error;
  }

  const { data: coupons } = data;

  return coupons;
}

export async function applyCoupon(couponCode: string) {
  const { error, data } = await apiClient.POST('/api/v2/storefront/coupons/apply', {
    body: { code: couponCode }
  });

  if (error) {
    throw error;
  }
  return data;
}
