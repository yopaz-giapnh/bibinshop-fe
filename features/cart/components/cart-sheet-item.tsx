import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { Typography } from '@/components/ui/typography';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { QuantityAdjustmentButtons } from './quantity-adjustment-buttons';

type Props = {
  cartItem: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };
};

export function CartSheetItem({ cartItem }: Props) {
  return (
    <div className="relative inline-flex items-center gap-[16px]">
      <Image alt="" src="/shop.png" width={100} height={100} className="rounded-[4px]" />
      <div className="relative inline-flex flex-[0_0_auto] flex-col items-start gap-[4px]">
        <Typography as="linkSmall" element="p" className="text-black-90">
          {cartItem.name}
        </Typography>
        <Typography as="subCaption" element="p" className="text-black-70">
          色: vol. 6
        </Typography>
        <Typography as="linkSmall" element="p" className="text-bibinBlue-100">
          {cartItem.price.toLocaleString()}円
        </Typography>

        <div className="flex w-full justify-between">
          <QuantityAdjustmentButtons
            quantity={cartItem.quantity}
            onDecrease={() => {}}
            onIncrease={() => {}}
          />

          <ButtonWithIcon
            buttonProps={{ onClick: () => {} }}
            icon={<Trash className="h-4 w-4" fill="text-black-80" />}
          />
        </div>
      </div>
    </div>
  );
}
