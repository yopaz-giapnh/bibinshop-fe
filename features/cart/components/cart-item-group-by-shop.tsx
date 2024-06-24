'use client';

import Shop from '@/assets/cart/shop.svg';
import { Typography } from '@/components/ui/typography';
import { ImageSchema, VariantSchema } from '@/features/product/types';
import { findImageFromLineItem, getProductImageUrl } from '@/features/product/utils';
import Image from 'next/image';
import { updateItemQuantity } from '../actions';
import { LineItem, VendorTotal } from '../types';
import { CartDeleteItemButton } from './cart-delete-item-button';
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
    <div className="flex flex-col gap-4 rounded-[6px] bg-white-base p-4 shadow-base">
      <label key={shop.id.toString()} className="flex cursor-pointer items-center">
        <Typography as="bold" element="h2" className="text-[14px] text-black-90 md:text-[18px]">
          {shop.attributes.name}
        </Typography>
      </label>

      {shop.lineItems.map((lineItem) => {
        const key = `${shop.id}-${lineItem.id}`;
        const image = findImageFromLineItem({ lineItem, variants, images });

        return (
          <label key={key} className="flex cursor-pointer items-center gap-4">
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
                  className="max-w-[145px] overflow-hidden whitespace-normal  break-words text-black-90 md:max-w-none"
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2
                  }}
                >
                  {lineItem.attributes.name}
                </Typography>
                <CartDeleteItemButton lineItemId={lineItem.id} className="md:hidden" />
              </div>
              {/* TODO: プロパティ設定 */}
              {/* <Typography as="subCaption" element="h3" className="text-black-70">
                色: vol. 6
              </Typography> */}
              <div className="mb-[10px] flex items-center justify-between md:mb-0">
                <Typography as="linkSmall" element="h3" className="text-bibinBlue-100">
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

                  <CartDeleteItemButton lineItemId={lineItem.id} className="hidden md:block" />
                </div>
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
}
