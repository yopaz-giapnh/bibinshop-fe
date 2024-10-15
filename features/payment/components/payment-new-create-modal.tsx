'use client';

import { DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { Dialog } from '@radix-ui/react-dialog';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { PaymentForm } from './payment-form';

export type PaymentNewCreateModalRef = {
  open: () => void;
  close: () => void;
};

/**
 * 新しいカードを追加するモーダル
 * @returns JSX.Element
 */
export const PaymentNewCreateModal = forwardRef<PaymentNewCreateModalRef>((_, ref) => {
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
          <div className="flex flex-col items-center">
            <Typography as="bold" element="p" className="text-[16px] text-black-90 md:text-[20px]">
              新しいカードを追加
            </Typography>
          </div>
          <PaymentForm onClose={() => setIsOpen(false)} />
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
});

PaymentNewCreateModal.displayName = 'PaymentNewCreateModal';
