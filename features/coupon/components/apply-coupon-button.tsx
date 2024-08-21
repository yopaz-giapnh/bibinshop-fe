'use client';

import { Typography } from '@/components/ui/typography';
import { ChevronRight, Ticket } from 'lucide-react';
import { useRef } from 'react';
import { CouponSheet, CouponSheetRef } from './coupon-sheet';

export function ApplyCouponButton() {
  const couponSheetRef = useRef<CouponSheetRef>(null);

  return (
    <>
      <button
        className="flex justify-between rounded-[6px] bg-white-base px-4 py-[19px] shadow-base"
        onClick={() => couponSheetRef.current?.open()}
      >
        <div className="flex items-center ">
          <Ticket className="h-6 w-6" color="#51B7FF" />
          <Typography as="bold" element="p" className="text-text-90 ml-[10px] text-[16px]">
            クーポン適用
          </Typography>
        </div>
        <ChevronRight className="h-6 w-6" color="black" />
      </button>
      <CouponSheet ref={couponSheetRef} />
    </>
  );
}
