'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { Cart } from '../types';
import { CartItemGroupByShop } from './cart-item-group-by-shop';

type Props = {
  cart: Cart;
};

export function CartItemList({ cart }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <label
        key="all"
        className="flex cursor-pointer items-center rounded-[6px] bg-white-base px-[11px] py-[10px] shadow-base"
      >
        <Typography as="boldTitle" element="h2" className="text-text-100">
          {`すべての商品 (${cart.attributes.item_count})`}
        </Typography>
      </label>
      <ScrollArea>
        <div className="flex h-[calc(100vh_-_373px)] flex-col gap-4">
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
