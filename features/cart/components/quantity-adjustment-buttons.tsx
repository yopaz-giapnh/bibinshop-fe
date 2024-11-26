'use client';

import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

type Props = {
  initialQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
  quantitiyInStock?: number;
};

export function QuantityAdjustmentButtons({
  initialQuantity,
  onQuantityChange,
  quantitiyInStock
}: Props) {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const maxQuantity = 23;
  const minQuantity = 1;
  const isAtMinimum = quantity <= minQuantity;

  const handleIncrease = async () => {
    if (isUpdating) return;

    if (quantitiyInStock && quantity >= quantitiyInStock) {
      toast({
        title: 'これ以上商品を追加できません。',
        variant: 'destructive'
      });
      return;
    }
    if (quantity === maxQuantity) {
      toast({
        title: `同じ商品は${maxQuantity}個までしか購入できません。`,
        variant: 'destructive'
      });
      return;
    }
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setIsUpdating(true);

    try {
      await onQuantityChange(newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDecrease = async () => {
    if (isUpdating || isAtMinimum) return;

    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    setIsUpdating(true);

    try {
      await onQuantityChange(newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-[9px]">
      <button
        className="flex h-8 w-8 items-center justify-center rounded-[16px] bg-powderBlue"
        type="button"
        onClick={handleDecrease}
        disabled={isAtMinimum || isUpdating}
        style={{ opacity: isAtMinimum || isUpdating ? 0.5 : 1 }}
      >
        <Minus className="h-5 w-5 text-black-30" />
      </button>
      <div className="flex w-[30px] items-center justify-center">
        {isUpdating ? (
          <LoadingSpinner size={16} />
        ) : (
          <Typography as="boldSmall" element="p" className="text-black-100 text-center">
            {quantity}
          </Typography>
        )}
      </div>
      <button
        className="flex h-8 w-8 items-center justify-center rounded-[16px] bg-powderBlue"
        type="button"
        onClick={handleIncrease}
        disabled={isUpdating}
        style={{
          opacity:
            isUpdating ||
            (quantitiyInStock && quantity >= quantitiyInStock) ||
            quantity === maxQuantity
              ? 0.5
              : 1
        }}
      >
        <Plus className="h-5 w-5 text-black-80" />
      </button>
    </div>
  );
}
