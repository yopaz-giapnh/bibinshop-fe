import Shop from '@/assets/cart/shop.svg';
import Trash from '@/assets/trash.svg';
import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { Checkbox } from '@/components/ui/checkbox';
import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import { QuantityAdjustmentButtons } from './quantity-adjustment-buttons';

type Shop = {
  id: number;
  name: string;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
};

type Props = {
  shop: Shop;
  onCheckedChangeShop: (checked: boolean | string, shopId: number) => void;
  onCheckedChangeItem: (checked: boolean | string, itemId: number) => void;
};

export function CartItemGroupByShop({ shop, onCheckedChangeShop, onCheckedChangeItem }: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-[6px] bg-white-base p-4 shadow-base">
      <label key={shop.id.toString()} className="flex cursor-pointer items-center">
        <div className="flex h-[46px] w-[46px] items-center justify-center">
          <Checkbox
            id={shop.id.toString()}
            defaultChecked
            onCheckedChange={(checked) => {
              onCheckedChangeShop(checked, shop.id);
              console.log('event.target', checked);
            }}
          />
        </div>
        <Typography as="bold" element="h2" className="text-black-90">
          {shop.name}
        </Typography>
      </label>

      {shop.items.map((item) => {
        const key = `${shop.id}-${item.id}`;
        return (
          <label key={key} className="flex cursor-pointer items-center gap-4">
            <div className="flex h-[46px] w-[46px] items-center justify-center">
              <Checkbox
                id={key}
                defaultChecked
                onCheckedChange={(checked) => {
                  onCheckedChangeItem(checked, item.id);
                }}
              />
            </div>

            <Image src="/shop.png" width={100} height={100} alt="" className="rounded-[4px]" />

            <div className="flex flex-1 flex-col gap-1">
              <Typography as="linkSmall" element="h3" className="text-black-90">
                {item.name}
              </Typography>
              <Typography as="subCaption" element="h3" className="text-black-70">
                色: vol. 6
              </Typography>
              <div className="flex items-center justify-between">
                <Typography as="linkSmall" element="h3" className="text-bibinBlue-100">
                  {item.price}円
                </Typography>

                <div className="flex gap-6">
                  <QuantityAdjustmentButtons
                    quantity={item.quantity}
                    onIncrease={() => {
                      console.log('onIncrease');
                    }}
                    onDecrease={() => {
                      console.log('onDecrease');
                    }}
                  />

                  <ButtonWithIcon
                    buttonProps={{ onClick: () => {} }}
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
