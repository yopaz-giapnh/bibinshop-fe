'use client';

import { useCoupon } from '@/features/coupon/components/coupon-ctx';
import { useEffect } from 'react';

export function ResetCouponClient() {
  const { resetActiveCoupon } = useCoupon();

  useEffect(() => {
    resetActiveCoupon();
  }, [resetActiveCoupon]);

  return null;
}
