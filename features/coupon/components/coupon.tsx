'use client';

import { BackButton } from '@/components/button/back-button';
import { Pagination } from '@/components/ui/pagination';
import { Typography } from '@/components/ui/typography';
import { useRef } from 'react';
import { getCoupons } from '../actions';
import { CouponCard } from './coupon-card';
import { CouponCodeInputModal, CouponCodeInputModalRef } from './coupon-code-input-modal';
import CouponListEmptyView from './coupon-list-empty-view';

// クーポン情報のdemo型定義
interface CouponInfo {
  id: string;
  showLabel: boolean;
  label?: string;
  title: string;
  subtitle: string;
  validUntil: string;
  couponCode: string;
}

// デモデータ
const coupons: CouponInfo[] = [
  {
    id: '1',
    showLabel: true,
    label: '新規',
    title: '初回限定50%オフ',
    subtitle: '全商品対象',
    validUntil: '有効期限：2024年9月30日まで',
    couponCode: 'FIRST50'
  },
  {
    id: '2',
    showLabel: false,
    title: '夏季限定10%オフ',
    subtitle: '夏物商品対象',
    validUntil: '有効期限：2024年8月31日まで',
    couponCode: 'SUMMER10'
  },
  {
    id: '3',
    showLabel: true,
    label: '限定',
    title: '誕生日特別クーポン',
    subtitle: 'お好きな商品1点',
    validUntil: '有効期限：誕生日から1週間',
    couponCode: 'BIRTHDAY25'
  },
  {
    id: '4',
    showLabel: false,
    title: '誕生日特別クーポン',
    subtitle: 'お好きな商品1点',
    validUntil: '有効期限：誕生日から1週間',
    couponCode: 'BIRTHDAY25'
  },
  {
    id: '5',
    showLabel: false,
    title: '誕生日特別クーポン',
    subtitle: 'お好きな商品1点',
    validUntil: '有効期限：誕生日から1週間',
    couponCode: 'BIRTHDAY25'
  }
];

export default function Coupon() {
  const couponCodeInputModalRef = useRef<CouponCodeInputModalRef>(null);
  const myCoupons = async () => {
    const couponData = await getCoupons();
    return couponData;
  };

  console.log(myCoupons(), '---------------');

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
        {coupons.length === 0 ? (
          <CouponListEmptyView />
        ) : (
          <div className="w-full space-y-4 overflow-y-auto md:mt-[24px]">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {coupons.map((coupon) => (
                <CouponCard
                  key={coupon.id}
                  showLabel={coupon.showLabel}
                  label={coupon.label}
                  title={coupon.title}
                  subtitle={coupon.subtitle}
                  validUntil={coupon.validUntil}
                  couponCode={coupon.couponCode}
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
