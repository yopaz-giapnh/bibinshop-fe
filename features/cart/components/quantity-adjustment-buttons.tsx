import { Typography } from '@/components/ui/typography';
import { Minus, Plus } from 'lucide-react';

type Props = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function QuantityAdjustmentButtons({ quantity, onDecrease, onIncrease }: Props) {
  return (
    <div className="flex items-center gap-[9px]">
      <button
        className="flex h-8 w-8 items-center justify-center rounded-[16px] bg-powderBlue"
        type="button"
        onClick={onDecrease}
      >
        <Minus className="h-5 w-5 text-black-30" />
      </button>
      <Typography as="boldSmall" element="p" className="text-black-100 w-[30px] text-center">
        {quantity}
      </Typography>
      <button
        className="flex h-8 w-8 items-center justify-center rounded-[16px] bg-powderBlue"
        type="button"
        onClick={onIncrease}
      >
        <Plus className="h-5 w-5 text-black-80" />
      </button>
    </div>
  );
}
