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

  return coupons || [];
}

export async function applyCoupon(couponCode: string) {
  try {
    const { error } = await apiClient.POST('/api/v2/storefront/coupons/apply', {
      body: { code: couponCode }
    });
    if (error) {
      throw error;
    }
    return { success: true, message: 'クーポンが追加されました' };
  } catch (error) {
    return { success: false, message: 'クーポンの追加に失敗しました' };
  }
}

export async function cartAddCoupon(couponId: string) {
  try {
    const { error } = await apiClient.PATCH('/api/v2/storefront/cart/add_coupon', {
      body: { coupon_id: couponId }
    });
    if (error) {
      throw error;
    }
    return { success: true, message: 'クーポンが追加されました' };
    // TODO: container にいれときたい
  } catch (error) {
    return { success: false, message: 'クーポンの追加に失敗しました' };
  }
}
