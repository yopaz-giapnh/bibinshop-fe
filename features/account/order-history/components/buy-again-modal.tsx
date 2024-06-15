'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { addItem } from '@/features/cart/actions';
import { BadgeAlert, Check, IterationCcw } from 'lucide-react';

type Props = {
  variantIds: string[];
};

/**
 * 再度購入するか確認モーダル
 * @returns JSX.Element
 */
export default function BuyAgainModal({ variantIds }: Props) {
  const { toast } = useToast();

  const addToCart = async () => {
    const results = await Promise.all(
      variantIds.map((variantId) => addItem(null, { productId: variantId, quantity: 1 }))
    );

    if (results.some((result) => result.success)) {
      toast({
        title: 'カートに追加しました',
        icon: <Check className="h-6 w-6" />
      });
    } else {
      toast({
        title: 'カートに追加できませんでした',
        className: 'bg-error',
        icon: <BadgeAlert className="h-6 w-6" />
      });
    }
  };

  return (
    <Dialog>
      <DialogDescription>
        <DialogTrigger asChild>
          <Button type="button" className="w-[222px]">
            <IterationCcw className="h-[18px] w-[18px]" />
            <Typography as="bold" element="p" className="ml-[8px] text-[14px] text-white-base">
              再度購入
            </Typography>
          </Button>
        </DialogTrigger>
        <DialogContent className="flex w-[640px] flex-col items-center justify-center">
          <DialogHeader className="flex flex-col items-center">
            <DialogTitle>買い物かごにもう一度この注文からのアイテムを</DialogTitle>
            <DialogTitle className="pt-[4px]">を追加してもよろしいですか？</DialogTitle>
          </DialogHeader>
          <div className="flex w-[348px] justify-between pt-[12px]">
            <DialogClose asChild>
              <button
                type="submit"
                className="w-[170px] rounded-[100px] border-[1px] border-bibinBlue-100 text-bibinBlue-100"
              >
                キャンセル
              </button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" variant="lg" className="w-[170px]" onClick={addToCart}>
                確認
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
}
