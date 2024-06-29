'use client';

import Shop from '@/assets/cart/shop.svg';
import { Typography } from '@/components/ui/typography';
import { ImageSchema, VariantSchema } from '@/features/product/types';
import { findImageFromLineItem, getProductImageUrl } from '@/features/product/utils';
import { Store } from 'lucide-react';
import Image from 'next/image';
import { updateItemQuantity } from '../actions';
import { LineItem, VendorTotal } from '../types';
import { CartDeleteItemButton, MobileCartDeleteItemButton } from './cart-delete-item-button';
import { QuantityAdjustmentButtons } from './quantity-adjustment-buttons';

type Shop = VendorTotal & {
  lineItems: LineItem[];
  variants: VariantSchema[];
  images: ImageSchema[];
};

type Props = {
  shop: Shop;
};

export function CartItemGroupByShop({ shop }: Props) {
  const { variants, images } = shop;

  return (
    <div className="flex flex-col gap-4 rounded-[6px] bg-white-base p-4">
      <div
        key={shop.id.toString()}
        className="mt-[4px] flex cursor-pointer items-center md:mt-[0px]"
      >
        <Store className="mr-[4px] h-[18px] w-[18px]" />
        <Typography as="bold" element="h2" className="text-[14px] text-black-90 md:text-[18px]">
          {shop.attributes.name}
        </Typography>
      </div>

      {shop.lineItems.map((lineItem) => {
        const key = `${shop.id}-${lineItem.id}`;
        const image = findImageFromLineItem({ lineItem, variants, images });
        const variant = variants.find(
          (variant) => variant.id === lineItem.relationships.variant?.data?.id
        );

        return (
          <div key={key} className="flex cursor-pointer items-center gap-4">
            <div className="relative h-[100px] w-[100px]">
              <Image
                src={getProductImageUrl(image)}
                layout="fill"
                objectFit="cover"
                className="rounded-[4px]"
                alt={''}
              />
            </div>
            <div className="flex h-[100px] flex-1 flex-col justify-between gap-1 md:justify-normal">
              <div className="flex justify-between">
                <Typography
                  as="linkSmall"
                  element="h3"
                  className="max-w-[145px] overflow-hidden whitespace-normal break-words text-[12px] text-black-90  md:max-w-none md:text-[14px]"
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2
                  }}
                >
                  {lineItem.attributes.name}
                </Typography>
                <div className="md:hidden">
                  <MobileCartDeleteItemButton lineItemId={lineItem.id} />
                </div>
              </div>
              {!!variant?.attributes.options_text && (
                <Typography as="subCaption" element="h3" className="text-black-70">
                  {variant.attributes.options_text}
                </Typography>
              )}
              <div className="mb-[10px] flex items-center justify-between md:mb-0">
                <Typography
                  as="linkSmall"
                  element="h3"
                  className="text-[14px] text-bibinBlue-100 md:text-[16px]"
                >
                  {lineItem.attributes.display_price}
                </Typography>

                <div className="flex gap-6">
                  {lineItem.attributes.quantity != null && (
                    <QuantityAdjustmentButtons
                      quantity={lineItem.attributes.quantity}
                      onIncrease={async () => {
                        await updateItemQuantity({ lineItem, type: 'plus' });
                      }}
                      onDecrease={async () => {
                        await updateItemQuantity({ lineItem, type: 'minus' });
                      }}
                    />
                  )}
                  <div className="hidden md:block">
                    <CartDeleteItemButton lineItemId={lineItem.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
