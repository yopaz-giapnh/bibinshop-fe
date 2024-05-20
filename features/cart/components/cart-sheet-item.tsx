import { Typography } from '@/components/ui/typography';
import { Minus, Plus, Trash } from 'lucide-react';
import Image from 'next/image';

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
          <div className="flex items-center gap-[9px]">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-[16px] bg-powderBlue"
              type="button"
              onClick={() => {}}
            >
              <Minus className="h-5 w-5 text-black-30" />
            </button>
            <Typography as="boldSmall" element="p" className="text-black-100 w-[30px] text-center">
              {cartItem.quantity}
            </Typography>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-[16px] bg-powderBlue"
              type="button"
              onClick={() => {}}
            >
              <Plus className="h-5 w-5 text-black-80" />
            </button>
          </div>
          <button className="flex items-center justify-center gap-[2px]">
            <Trash className="h-4 w-4" fill="text-black-80" />
            <Typography as="linkXSmall" element="p" className="text-black-80 underline">
              削除
            </Typography>
          </button>
        </div>
      </div>
    </div>
  );
}
