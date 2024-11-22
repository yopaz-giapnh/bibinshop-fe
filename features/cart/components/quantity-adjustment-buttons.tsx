import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { Minus, Plus } from 'lucide-react';

type Props = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  maxQuantity?: number;
  minQuantity?: number;
};

export function QuantityAdjustmentButtons({
  quantity,
  onDecrease,
  onIncrease,
  maxQuantity = 23,
  minQuantity = 1
}: Props) {
  const { toast } = useToast();
  const isAtMaximum = quantity >= maxQuantity;
  const isAtMinimum = quantity <= minQuantity;

  const handleIncrease = () => {
    if (isAtMaximum) {
      toast({
        title: '同じ商品は23個までしか購入できません。',
        variant: 'destructive'
      });
      return;
    }
    onIncrease();
  };

  return (
    <div className="flex items-center gap-[9px]">
      <button
        className="flex h-8 w-8 items-center justify-center rounded-[16px] bg-powderBlue"
        type="button"
        onClick={onDecrease}
        disabled={isAtMinimum}
        style={{ opacity: isAtMinimum ? 0.5 : 1 }}
      >
        <Minus className="h-5 w-5 text-black-30" />
      </button>
      <Typography as="boldSmall" element="p" className="text-black-100 w-[30px] text-center">
        {quantity}
      </Typography>
      <button
        className="flex h-8 w-8 items-center justify-center rounded-[16px] bg-powderBlue"
        type="button"
        onClick={handleIncrease}
        style={{ opacity: isAtMaximum ? 0.5 : 1 }}
      >
        <Plus className="h-5 w-5 text-black-80" />
      </button>
    </div>
  );
}
