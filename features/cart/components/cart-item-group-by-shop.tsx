import Shop from '@/assets/cart/shop.svg';
import Trash from '@/assets/trash.svg';
import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import { removeLinteItem, updateItemQuantity } from '../actions';
import { LineItem, VendorTotal } from '../types';
import { QuantityAdjustmentButtons } from './quantity-adjustment-buttons';

type Shop = VendorTotal & {
  lineItems: LineItem[];
};

type Props = {
  shop: Shop;
};

export function CartItemGroupByShop({ shop }: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-[6px] bg-white-base p-4 shadow-base">
      <label key={shop.id.toString()} className="flex cursor-pointer items-center">
        <Typography as="bold" element="h2" className="text-black-90">
          {shop.attributes.name}
        </Typography>
      </label>

      {shop.lineItems.map((lineItem) => {
        const key = `${shop.id}-${lineItem.id}`;
        return (
          <label key={key} className="flex cursor-pointer items-center gap-4">
            <Image src="/shop.png" width={100} height={100} alt="" className="rounded-[4px]" />
            <div className="flex flex-1 flex-col gap-1">
              <Typography as="linkSmall" element="h3" className="text-black-90">
                {lineItem.attributes.name}
              </Typography>
              <Typography as="subCaption" element="h3" className="text-black-70">
                色: vol. 6
              </Typography>
              <div className="flex items-center justify-between">
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

                  <ButtonWithIcon
                    buttonProps={{
                      onClick: async () => {
                        await removeLinteItem(lineItem.id);
                      }
                    }}
                    icon={<Trash />}
                    text="削除"
                  />
                </div>
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
}
