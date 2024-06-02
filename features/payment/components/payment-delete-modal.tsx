'use client';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription } from '@/components/ui/dialog';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { Dialog, DialogClose } from '@radix-ui/react-dialog';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { deleteAccountCreditCard } from '../actions';
import { CreditCard } from '../types';
import { getCreditCardBrandIcon } from '../utils';

export type PaymentDeleteModalRef = {
  open: () => void;
  close: () => void;
};

type PaymentDeleteModalProps = {
  creditCard: CreditCard;
};

/**
 * カードを削除するモーダル
 * @returns JSX.Element
 */
export const PaymentDeleteModal = forwardRef<PaymentDeleteModalRef, PaymentDeleteModalProps>(
  ({ creditCard }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => {
      setIsOpen(true);
    };
    const onClose = () => {
      setIsOpen(false);
    };

    useImperativeHandle(ref, () => ({
      open: onOpen,
      close: onClose
    }));

    const [message, formAction] = useFormState(deleteAccountCreditCard, null);
    const action = formAction.bind(null, creditCard.id || '');

    useEffect(() => {
      if (message && message.success) {
        onClose();
      }
    }, [message]);

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
                <form action={action}>
                  <DeleteButton />
                </form>
              </div>
            </div>
          </DialogContent>
        </DialogDescription>
      </Dialog>
    );
  }
);

PaymentDeleteModal.displayName = 'PaymentDeleteModal';

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button size="lg" variant="lg" className="w-[170px]" disabled={pending}>
      {pending ? <LoadingSpinner /> : '削除'}
    </Button>
  );
}
