'use client';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { Dialog, DialogClose } from '@radix-ui/react-dialog';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { CreditCard } from '../types';
import { getCreditCardBrandIcon } from '../utils';

export type PaymentDeleteModalRef = {
  open: () => void;
  close: () => void;
};

type PaymentDeleteModalProps = {
  creditCard: CreditCard;
  onDelete: (creditCard: CreditCard) => void;
};

/**
 * カードを削除するモーダル
 * @returns JSX.Element
 */
export const PaymentDeleteModal = forwardRef<PaymentDeleteModalRef, PaymentDeleteModalProps>(
  ({ creditCard, onDelete }, ref) => {
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
          <DialogContent className="flex w-[540px] flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <Typography as="bold" element="p" className="mb-[24px] text-[20px] text-black-90">
                このカードを削除してもよろしいですか？
              </Typography>
              <div className="mb-[20px] flex w-[458px] items-center justify-between rounded-[6px] border border-solid border-black-10 p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    {getCreditCardBrandIcon(creditCard)}
                    <Typography
                      as="bold"
                      element="p"
                      className="ml-[8px] text-[20px] text-black-80"
                    >
                      {creditCard.attributes.cc_type + ' Card'}
                    </Typography>
                  </div>
                  <Typography as="body" element="p" className="text-[14px] text-black-90 ">
                    {'末尾が****' + creditCard.attributes.last_digits + 'のクレジットカード'}
                  </Typography>
                </div>
              </div>
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
                  <Button
                    type="button"
                    variant="lg"
                    className="w-[170px]"
                    onClick={() => onDelete(creditCard)}
                  >
                    削除
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </DialogDescription>
      </Dialog>
    );
  }
);

PaymentDeleteModal.displayName = 'PaymentDeleteModal';
