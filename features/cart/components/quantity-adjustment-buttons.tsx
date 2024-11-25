'use client';

import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

type Props = {
  initialQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
  maxQuantity?: number;
  minQuantity?: number;
  quantitiyInStock?: number;
};

export function QuantityAdjustmentButtons({
  initialQuantity,
  onQuantityChange,
  maxQuantity = 23,
  minQuantity = 1,
  quantitiyInStock
}: Props) {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(initialQuantity);
  const isAtMinimum = quantity <= minQuantity;

  const handleIncrease = () => {
    if (quantitiyInStock && quantity >= quantitiyInStock) {
      toast({
        title: 'これ以上商品を追加できません。',
        variant: 'destructive'
      });
      return;
    }
    if (quantity === maxQuantity) {
      toast({
        title: '同じ商品は23個までしか購入できません。',
        variant: 'destructive'
      });
      return;
    }
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleDecrease = () => {
    if (isAtMinimum) return;
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  return (
    <div className="flex items-center gap-[9px]">
      <button
        className="flex h-8 w-8 items-center justify-center rounded-[16px] bg-powderBlue"
        type="button"
        onClick={handleDecrease}
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
        style={{
          opacity:
            (quantitiyInStock && quantity >= quantitiyInStock) || quantity === maxQuantity ? 0.5 : 1
        }}
      >
        <Plus className="h-5 w-5 text-black-80" />
      </button>
    </div>
  );
}
