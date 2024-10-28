'use server';

import { apiClient } from '@/config/api-client';
import { isNotFound } from '@/utils/api';
import { cookies } from 'next/headers';
import { COOKIES, TAGS } from '../constants';
import { CouponSchema } from '../types';

export async function getCoupons({ cache = 'no-store' }: { cache?: RequestCache } = {}) {
  try {
    const { response, error, data } = await apiClient.GET('/api/v2/storefront/coupons', {
      params: {},
      fetch: (request) => {
        return fetch(request, { next: { tags: [TAGS.coupon] }, cache });
      }
    });

    if (isNotFound(response)) {
      return [];
    }

    if (error) {
      throw error;
    }

    const coupons = data.data?.filter((coupon) => coupon.attributes.status === 'available') || [];

    return coupons;
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return [];
  }
}

type ApplyCouponResult = {
  success: boolean;
  message: string;
  coupon: CouponSchema | null;
};

export async function applyCoupon(couponCode: string): Promise<ApplyCouponResult> {
  try {
    const { error, data } = await apiClient.POST('/api/v2/storefront/coupons/apply', {
      body: { code: couponCode }
    });
    if (error) {
      throw error;
    }
    const coupon = data.data as unknown as CouponSchema;
    return { success: true, message: 'クーポンが追加されました', coupon };
  } catch (error) {
    return { success: false, message: 'クーポンの追加に失敗しました', coupon: null };
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
    // Cookie にクーポン ID を保存
    cookies().set(COOKIES.activeCouponId, couponId);
    return { success: true, message: 'クーポンが追加されました' };
  } catch (error) {
    return { success: false, message: 'クーポンの追加に失敗しました' };
  }
}

export async function cartRemoveCoupon(couponId: string) {
  try {
    const { error } = await apiClient.PATCH('/api/v2/storefront/cart/remove_coupon', {
      body: { coupon_id: couponId }
    });
    if (error) {
      throw error;
    }
    // Cookie からクーポン ID を削除
    cookies().delete(COOKIES.activeCouponId);
    return { success: true, message: 'クーポンが取り消されました' };
  } catch (error) {
    return { success: false, message: 'クーポンの取り消しに失敗しました' };
  }
}
