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
  buttonStyle?: string;
  buttonIconStyle?: string;
  buttonTextStyle?: string;
};

/**
 * 再度購入するか確認モーダル
 * @returns JSX.Element
 */
export default function BuyAgainModal({
  variantIds,
  buttonStyle,
  buttonIconStyle,
  buttonTextStyle
}: Props) {
  const { toast } = useToast();

  const addToCart = async () => {
    const results = await Promise.all(
      variantIds.map((variantId) => addItem(null, { variantId, quantity: 1 }))
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
          <Button type="button" className={buttonStyle}>
            <IterationCcw className={buttonIconStyle} />
            <Typography as="bold" element="p" className={buttonTextStyle}>
              再度購入
            </Typography>
          </Button>
        </DialogTrigger>
        <DialogContent className="flex w-11/12 flex-col items-center justify-center md:w-[640px]">
          <DialogHeader className="mt-[8px] flex flex-col items-center md:pt-0">
            <DialogTitle className="text-center text-[14px] md:text-[18px]">
              買い物かごにもう一度この注文からのアイテムを
            </DialogTitle>
            <DialogTitle className="text-center text-[14px] md:pt-[2px] md:text-[18px]">
              を追加してもよろしいですか？
            </DialogTitle>
          </DialogHeader>
          <div className="flex w-full justify-around pt-[12px] md:w-[348px]">
            <DialogClose asChild>
              <button
                type="submit"
                className="w-[150px] rounded-[100px] border-[1px] border-bibinBlue-100 text-bibinBlue-100 md:w-[170px]"
              >
                キャンセル
              </button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                variant="lg"
                className="w-[150px] md:w-[170px]"
                onClick={addToCart}
              >
                確認
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
}
