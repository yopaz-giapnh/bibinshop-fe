'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
// import { Check } from 'lucide-react';
import { Cart } from '../types';
import { CartItemGroupByShop } from './cart-item-group-by-shop';

type Props = {
  cart: Cart;
};

export function CartItemList({ cart }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* TODO: BE接続時コメントイン */}
      {/* <div className="flex items-center rounded-[6px] border border-indigo-200 bg-indigo-100  px-[11px] py-[10px]">
        <Check className="mr-2 h-4 w-4" />
        <Typography as="title" element="h1" className="flex text-[14px] text-text-80">
          クーポンを適用しています。
          <Typography as="title" element="h1" className="text-[14px] text-red-500">
            1,000円
          </Typography>
          を節約しよう！
        </Typography>
      </div> */}
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
