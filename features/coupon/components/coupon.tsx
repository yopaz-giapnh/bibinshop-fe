'use client';

import { BackButton } from '@/components/button/back-button';
import { Pagination } from '@/components/ui/pagination';
import { Typography } from '@/components/ui/typography';
import { use, useRef } from 'react';
import { getCoupons } from '../actions';
import { CouponCard } from './coupon-card';
import { CouponCodeInputModal, CouponCodeInputModalRef } from './coupon-code-input-modal';
import CouponListEmptyView from './coupon-list-empty-view';

type Props = {
  getCoupons: ReturnType<typeof getCoupons>;
};

export default function Coupon({ getCoupons }: Props) {
  const couponCodeInputModalRef = useRef<CouponCodeInputModalRef>(null);
  const myCoupons = use(getCoupons);

  return (
    <div className="mx-auto flex w-full flex-col items-center bg-paleFrostBlue p-[16px] md:p-[24px]">
      <div className="mb-[14px] flex w-full items-center justify-between md:mb-[24px] md:justify-center">
        <BackButton />
        <Typography
          as="boldXLarge"
          element="p"
          className="text-[18px] text-black-90 md:text-[24px]"
        >
          クーポン
        </Typography>
        <div className="h-7 w-7" />
      </div>
      <div className="flex h-full w-full flex-col justify-between">
        {!myCoupons || myCoupons.length === 0 ? (
          <CouponListEmptyView />
        ) : (
          <div className="w-full space-y-4 overflow-y-auto md:mt-[24px]">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {myCoupons.map((coupon) => (
                <CouponCard
                  key={coupon.id}
                  title={coupon.attributes.title}
                  description={coupon.attributes.description}
                  expiresAt={coupon.attributes.expires_at}
                  code={coupon.attributes.code}
                />
              ))}
            </div>
          </div>
        )}
        {/* TODO:ページング */}
        <Pagination />
        <div className="mt-[24px] flex w-full flex-col items-center justify-center rounded-md bg-white-base py-[24px] shadow-sm">
          <Typography as="bold" element="p" className="text-[16px] text-black-90 md:text-[20px]">
            クーポンが見つかりませんか？
          </Typography>
          <button
            className="mt-[16px] w-11/12 rounded-full border-[1px] border-bibinBlue-100 px-[48px] py-[8px] text-[14px] font-semibold text-bibinBlue-100 md:w-1/3"
            onClick={() => couponCodeInputModalRef.current?.open()}
          >
            クーポンコードを入力する
          </button>
        </div>
        <CouponCodeInputModal ref={couponCodeInputModalRef} />
      </div>
    </div>
  );
}
