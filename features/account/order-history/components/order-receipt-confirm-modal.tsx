'use client';

import BibiVacantFace from '@/assets/bibincban/vacant-face.svg';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { Dialog } from '@radix-ui/react-dialog';
import { forwardRef, useImperativeHandle, useState } from 'react';

export type OrderReceiptConfirmModalRef = {
  open: (email: string) => void;
  close: () => void;
};

type OrderReceiptConfirmModalProps = {
  onConfirm: () => void;
};

export const OrderReceiptConfirmModal = forwardRef<
  OrderReceiptConfirmModalRef,
  OrderReceiptConfirmModalProps
>(({ onConfirm }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    }
  }));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription>
        <DialogContent className="flex w-11/12 flex-col items-center justify-center md:w-[540px]">
          <DialogHeader>
            <DialogTitle className="text-[20px] font-bold text-black-90">
              商品を受け取りましたか？
            </DialogTitle>
          </DialogHeader>
          <Typography as="caption" element="p" className="pb-[24px] text-[14px] text-black-90">
            商品が到着した注文のみ受取確認をしてください。
          </Typography>
          <BibiVacantFace />
          <div className="flex gap-2 pt-[24px]">
            <Button
              className="h-[48px] w-[150px] border border-bibinBlue-100 bg-white-base md:h-[55px] md:w-[200px]"
              size="lg"
              variant="lg"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <Typography as="bold" element="p" className="text-bibinBlue-100">
                いいえ
              </Typography>
            </Button>
            <Button
              className="h-[48px] w-[150px] md:h-[55px] md:w-[200px]"
              size="lg"
              variant="lg"
              onClick={() => onConfirm()}
              type="button"
            >
              <Typography as="bold" element="p" className="text-white-base">
                はい
              </Typography>
            </Button>
          </div>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
});

OrderReceiptConfirmModal.displayName = 'OrderReceiptConfirmModal';
