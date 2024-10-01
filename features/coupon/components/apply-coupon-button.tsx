'use client';

import { Typography } from '@/components/ui/typography';
import { useIsPc } from '@/hooks/use-is-pc';
import { ChevronRight, Ticket } from 'lucide-react';
import { useRef } from 'react';
import { getCoupons } from '../actions';
import { CouponSheet, CouponSheetRef } from './coupon-sheet';

type Props = {
  getCoupons: ReturnType<typeof getCoupons>;
};

export function ApplyCouponButton({ getCoupons }: Props) {
  const couponSheetRef = useRef<CouponSheetRef>(null);
  const isPc = useIsPc();

  return (
    <>
      {isPc && (
        <button
          className="flex w-full justify-between rounded-[6px] bg-white-base px-4 py-[19px] shadow-base"
          onClick={() => couponSheetRef.current?.open()}
        >
          <div className="flex items-center">
            <Ticket className="h-6 w-6" color="#51B7FF" />
            <Typography as="bold" element="p" className="text-text-90 ml-[10px] text-[16px]">
              クーポン適用
            </Typography>
          </div>
          <ChevronRight className="h-6 w-6" color="black" />
        </button>
      )}
      {!isPc && (
        <button
          className="flex h-[45px] items-center justify-center rounded-full border border-bibinBlue-100 px-3"
          onClick={() => couponSheetRef.current?.open()}
        >
          <Ticket className="h-6 w-6" color="#51B7FF" />
          <Typography
            as="boldSmall"
            element="p"
            className="ml-[10px] text-[14px] text-bibinBlue-100"
          >
            クーポン適用
          </Typography>
        </button>
      )}
      <CouponSheet ref={couponSheetRef} getCoupons={getCoupons} />
    </>
  );
}
