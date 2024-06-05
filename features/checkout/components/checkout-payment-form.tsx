'use client';

import { Typography } from '@/components/ui/typography';
import { PaymentForm } from '@/features/payment/components/payment-form';
import { PaymentList } from '@/features/payment/components/payment-list';
import {
  PaymentNewCreateModal,
  PaymentNewCreateModalRef
} from '@/features/payment/components/payment-new-create-modal';
import { CreditCard } from '@/features/payment/types';
import { Plus } from 'lucide-react';
import { useRef } from 'react';

type Props = {
  creditCards: CreditCard[];
};

export function CheckoutPaymentForm({ creditCards }: Props) {
  const hasCreditCard = creditCards.length > 0;
  const paymentNewCreateModalRef = useRef<PaymentNewCreateModalRef>(null);

  return (
    <>
      {hasCreditCard ? (
        <>
          <PaymentList creditCards={creditCards} />
          <button
            type="button"
            className="flex w-fit items-center justify-center gap-1"
            onClick={() => {
              paymentNewCreateModalRef.current?.open();
            }}
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-[12px] border-2 border-black-80">
              <Plus className="h-5 w-5 text-black-80" />
            </div>
            <Typography as="linkSmall" element="h3" className="text-black-80">
              新しいカードを追加する
            </Typography>
          </button>
        </>
      ) : (
        <>
          <Typography as="caption" element="h3" className="text-text-100">
            クレジットカード登録
          </Typography>

          <PaymentForm />
        </>
      )}
      <PaymentNewCreateModal ref={paymentNewCreateModalRef} />
    </>
  );
}
