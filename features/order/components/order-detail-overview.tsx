'use client';
import { Typography } from '@/components/ui/typography';
import { Cart } from '@/features/cart/types';
import OrderDetailSection from './order-detail-section';

type Props = {
  cart: Cart;
};

export function OrderDetailOverview({ cart }: Props) {
  return (
    <OrderDetailSection title="注文概要">
      <div className="w-full md:w-1/2">
        <div className="flex justify-between">
          <Typography
            as="caption"
            element="p"
            className="mt-[8px] text-[14px] text-black-90 md:mt-[16px]"
          >
            {`商品金額(${cart.attributes.item_count})`}
          </Typography>
          <Typography
            as="caption"
            element="p"
            className="mt-[8px] text-[14px] text-black-90 md:mt-[16px]"
          >
            {cart.attributes.display_item_total}
          </Typography>
        </div>
        {!!cart.attributes.coupons_total && (
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
              - {cart.attributes.display_coupons_total}
            </Typography>
          </div>
        )}
        {!!cart.attributes.points && (
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
              - {cart.attributes.display_points}
            </Typography>
          </div>
        )}
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
            {cart.attributes.display_ship_total}
          </Typography>
        </div>
        <div className="mt-[8px] border-t-[1px] md:mt-[16px]" />
        <div className="carts-center flex justify-between">
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
            {cart.attributes.display_total}
          </Typography>
        </div>
      </div>
    </OrderDetailSection>
  );
}
