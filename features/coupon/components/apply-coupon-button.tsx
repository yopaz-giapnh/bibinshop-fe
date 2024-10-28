'use client';

import { Typography } from '@/components/ui/typography';
import { ChevronRight, Ticket } from 'lucide-react';
import { useRef } from 'react';
import { getCoupons } from '../actions';
import { useCoupon } from './coupon-ctx';
import { CouponSheet, CouponSheetRef } from './coupon-sheet';

type Props = {
  getCoupons: ReturnType<typeof getCoupons>;
};

export function ApplyCouponButton({ getCoupons }: Props) {
  const couponSheetRef = useRef<CouponSheetRef>(null);
  const { activeCoupon } = useCoupon();

  return (
    <>
      {!activeCoupon && (
        <button
          className="flex h-[45px] w-full items-center justify-between rounded-full border border-bibinBlue-100 bg-white-base  px-4 shadow-base md:rounded-md md:border-none"
          onClick={() => couponSheetRef.current?.open()}
        >
          <div className="flex items-center">
            <Ticket className="h-6 w-6" color="#51B7FF" />
            <Typography
              as="bold"
              element="p"
              className="md:text-text-90 ml-[10px] text-[14px] text-bibinBlue-100 md:text-[16px]"
            >
              クーポン適用
            </Typography>
          </div>
          <ChevronRight className="hidden h-6 w-6 md:block" color="black" />
        </button>
      )}
      <CouponSheet ref={couponSheetRef} getCoupons={getCoupons} />
    </>
  );
}
