'use client';

import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
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
  const [isIncreasing, setIsIncreasing] = useState(false);
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
    setIsIncreasing(true);
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

    setIsIncreasing(false);
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
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="flex h-8 w-8 items-center justify-center rounded-[16px] bg-powderBlue"
        type="button"
        onClick={handleDecrease}
        disabled={isAtMinimum || isUpdating}
        style={{ opacity: isAtMinimum || isUpdating ? 0.5 : 1 }}
      >
        <Minus className="h-5 w-5 text-black-30" />
      </motion.button>
      <div className="flex w-[30px] items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={quantity}
            initial={{ y: isIncreasing ? -20 : 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: isIncreasing ? 20 : -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Typography as="boldSmall" element="p" className="text-black-100 text-center">
              {quantity}
            </Typography>
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
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
      </motion.button>
    </div>
  );
}
