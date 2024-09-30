'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { useCoupon } from '@/features/coupon/components/coupon-ctx';
import { Check } from 'lucide-react';
import { Cart } from '../types';
import { displayCouponPromoTotal } from '../utils';
import { CartItemGroupByShop } from './cart-item-group-by-shop';

type Props = {
  cart: Cart;
};

export function CartItemList({ cart }: Props) {
  const { activeCoupon, removeActiveCoupon } = useCoupon();
  return (
    <div className="flex flex-col gap-4">
      {activeCoupon && (
        <div className="flex items-center justify-between rounded-[6px] border border-indigo-200 bg-indigo-100  px-[11px] py-[10px]">
          <div className="flex items-center">
            <Check className="mr-2 h-8 w-8 md:h-4 md:w-4" />
            <Typography as="title" element="h1" className="text-[14px] text-text-80">
              クーポンを適用しています。
              <span className="text-red-500">{displayCouponPromoTotal(cart, activeCoupon)}</span>
              を節約しよう！
            </Typography>
          </div>
          <div>
            <Typography
              as="boldTitle"
              element="button"
              className="text-[14px] text-red-500"
              // TODO: @coupon トースト表示
              onClick={removeActiveCoupon}
            >
              取消し
            </Typography>
          </div>
        </div>
      )}
      <label
        key="all"
        className="flex cursor-pointer items-center rounded-[6px] bg-white-base px-[11px] py-[10px] shadow-base"
      >
        <Typography
          as="boldTitle"
          element="h2"
          className="text-[16px] text-text-100 md:text-[20px]"
        >
          {`すべての商品 (${cart.attributes.item_count})`}
        </Typography>
      </label>
      <ScrollArea>
        <div className="mb-[16px] flex flex-col gap-4 md:h-[calc(100vh_-_373px)]">
          {cart.vendorTotals.map((vendorTotal) => (
            <CartItemGroupByShop
              key={vendorTotal.id}
              shop={{
                ...vendorTotal,
                lineItems: cart.lineItems.filter(
                  (lineItem) => lineItem.relationships.vendor?.data?.id === vendorTotal.id
                ),
                variants: cart.variants,
                images: cart.images
              }}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
