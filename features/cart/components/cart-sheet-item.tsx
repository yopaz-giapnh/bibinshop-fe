import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { Typography } from '@/components/ui/typography';
import { findImageFromLineItem, getProductImageUrl } from '@/features/product/utils';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { removeLineItem, updateItemQuantity } from '../actions';
import { Cart, LineItem } from '../types';
import { QuantityAdjustmentButtons } from './quantity-adjustment-buttons';

type Props = {
  cart: Cart;
  lineItem: LineItem;
};

export function CartSheetItem({ cart, lineItem }: Props) {
  const { variants, images } = cart;
  const image = findImageFromLineItem({
    lineItem,
    variants,
    images
  });
  const variant = variants.find(
    (variant) => variant.id === lineItem.relationships.variant?.data?.id
  );

  return (
    <div className="relative inline-flex items-center gap-[16px]">
      <div className="relative h-[100px] w-[100px]">
        <Image src={getProductImageUrl(image)} fill className="rounded-[4px]" alt={''} />
      </div>
      <div className="relative inline-flex w-[250px] flex-[0_0_auto] flex-col items-start gap-[4px]">
        <Typography as="linkSmall" element="p" className="text-black-90">
          {lineItem.attributes.name}
        </Typography>
        {!!variant?.attributes.options_text && (
          <Typography as="subCaption" element="p" className="text-black-70">
            {variant.attributes.options_text}
          </Typography>
        )}
        <Typography as="linkSmall" element="p" className="text-bibinBlue-100">
          {lineItem.attributes.display_price}
        </Typography>

        <div className="flex w-full justify-between">
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

          <ButtonWithIcon
            buttonProps={{
              onClick: async () => {
                await removeLineItem(lineItem.id);
              }
            }}
            icon={<Trash className="h-4 w-4" fill="text-black-80" />}
            text="削除"
          />
        </div>
      </div>
    </div>
  );
}
