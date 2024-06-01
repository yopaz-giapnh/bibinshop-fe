'use client';

import { Typography } from '@/components/ui/typography';
import { getAccountCreditCards } from '@/features/payment/actions';
import { PaymentForm } from '@/features/payment/components/payment-form';
import { PaymentList } from '@/features/payment/components/payment-list';
import {
  PaymentNewCreateModal,
  PaymentNewCreateModalRef
} from '@/features/payment/components/payment-new-create-modal';
import { Plus } from 'lucide-react';
import { use, useRef } from 'react';

type Props = {
  getAccountCreditCards: ReturnType<typeof getAccountCreditCards>;
};

export function CheckoutPaymentForm({ getAccountCreditCards }: Props) {
  const accountCreditCards = use(getAccountCreditCards);
  const hasCreditCard = accountCreditCards.length > 0;
  const paymentNewCreateModalRef = useRef<PaymentNewCreateModalRef>(null);

  return (
    <div className="flex flex-col gap-4 rounded-[6px] bg-white-base p-4">
      <div className="flex flex-col justify-between gap-4">
        <Typography as="boldTitle" element="h2" className="text-text-80">
          2. お支払い方法
        </Typography>
        {hasCreditCard ? (
          <>
            {/* TODO: クレカdelete処理追加 */}
            <PaymentList creditCards={accountCreditCards} onDelete={() => {}} />
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
      </div>
      <PaymentNewCreateModal ref={paymentNewCreateModalRef} />
    </div>
  );
}
