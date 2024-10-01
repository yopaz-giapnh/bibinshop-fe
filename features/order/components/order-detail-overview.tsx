'use client';
import { Typography } from '@/components/ui/typography';
import { CartSchema } from '@/features/cart/types';
import { displayCouponPromoTotal, displayTotal } from '@/features/cart/utils';
import { useCoupon } from '@/features/coupon/components/coupon-ctx';
import { useEffect, useState } from 'react';
import OrderDetailSection from './order-detail-section';

type Props = {
  item: CartSchema;
};

export function OrderDetailOverview({ item }: Props) {
  const { activeCoupon } = useCoupon();
  const [couponPromoTotal, setCouponPromoTotal] = useState<string | null>(null);

  useEffect(() => {
    setCouponPromoTotal(activeCoupon && displayCouponPromoTotal(item, activeCoupon));
  }, [activeCoupon, item, setCouponPromoTotal]);

  return (
    <OrderDetailSection title="注文概要">
      <div className="w-full md:w-1/2">
        <div className="flex justify-between">
          <Typography
            as="caption"
            element="p"
            className="mt-[8px] text-[14px] text-black-90 md:mt-[16px]"
          >
            {`商品金額(${item.attributes.item_count})`}
          </Typography>
          <Typography
            as="caption"
            element="p"
            className="mt-[8px] text-[14px] text-black-90 md:mt-[16px]"
          >
            {item.attributes.display_item_total}
          </Typography>
        </div>
        {!!couponPromoTotal && (
          <div className="flex justify-between">
            <Typography
              as="caption"
              element="p"
              className="mt-[8px] text-[14px] text-black-90 md:mt-[16px]"
            >
              割引金額
            </Typography>
            <Typography
              as="caption"
              element="p"
              className="mt-[8px] text-[14px] text-bibinBlue-100 md:mt-[16px]"
            >
              {couponPromoTotal}
            </Typography>
          </div>
        )}
        {/* TODO: @point BE接続時動作確認 */}
        <div className="flex justify-between">
          <Typography
            as="caption"
            element="p"
            className="mt-[8px] text-[14px] text-black-90 md:mt-[16px]"
          >
            ポイント利用
          </Typography>
          <Typography
            as="caption"
            element="p"
            className="mt-[8px] text-[14px] text-bibinBlue-100 md:mt-[16px]"
          >
            -1,000円
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography
            as="caption"
            element="p"
            className="mt-[8px] text-[14px] text-black-90 md:mt-[16px]"
          >
            送料
          </Typography>
          <Typography
            as="caption"
            element="p"
            className="mt-[8px] text-[14px] text-black-90 md:mt-[16px]"
          >
            {item.attributes.display_ship_total}
          </Typography>
        </div>
        <div className="mt-[8px] border-t-[1px] md:mt-[16px]" />
        <div className="flex items-center justify-between">
          <Typography
            as="caption"
            element="p"
            className="mt-[8px] text-[14px] text-black-90 md:mt-[16px]"
          >
            小計
          </Typography>
          <Typography
            as="bold"
            element="p"
            className="mt-[8px] text-[20px] text-black-90 md:mt-[16px]"
          >
            {activeCoupon ? displayTotal(item, activeCoupon) : item.attributes.display_item_total}
          </Typography>
        </div>
      </div>
    </OrderDetailSection>
  );
}
