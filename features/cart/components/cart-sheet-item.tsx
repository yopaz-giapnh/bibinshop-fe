import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { Typography } from '@/components/ui/typography';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { removeLinteItem, updateItemQuantity } from '../actions';
import { LineItem } from '../types';
import { QuantityAdjustmentButtons } from './quantity-adjustment-buttons';

type Props = {
  lineItem: LineItem;
};

export function CartSheetItem({ lineItem }: Props) {
  return (
    <div className="relative inline-flex items-center gap-[16px]">
      <Image alt="" src="/shop.png" width={100} height={100} className="rounded-[4px]" />
      <div className="relative inline-flex flex-[0_0_auto] flex-col items-start gap-[4px]">
        <Typography as="linkSmall" element="p" className="text-black-90">
          {lineItem.attributes.name}
        </Typography>
        <Typography as="subCaption" element="p" className="text-black-70">
          色: vol. 6
        </Typography>
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
                await removeLinteItem(lineItem.id);
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
