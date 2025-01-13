'use client';

import { Typography } from '@/components/ui/typography';
import { PaymentForm } from '@/features/payment/components/payment-form';
import { PaymentList } from '@/features/payment/components/payment-list';
import {
  PaymentNewCreateModal,
  PaymentNewCreateModalRef
} from '@/features/payment/components/payment-new-create-modal';
import { availablePaymentMethod } from '@/features/payment/constants';
import { CreditCard, PaymentMethodSchema } from '@/features/payment/types';
import {
  getDefaultCreditCard,
  isKonbiniPaymentMethod,
  isPayPayPaymentMethod
} from '@/features/payment/utils';
import { Plus } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useCheckout } from './checkout-ctx';

type Props = {
  creditCards: CreditCard[];
  paymentMethods: PaymentMethodSchema[];
};

export function CheckoutPaymentForm({ creditCards, paymentMethods }: Props) {
  const { setActivePaymentMethod, activePaymentMethod } = useCheckout();
  const hasCreditCard = creditCards.length > 0;
  const paymentNewCreateModalRef = useRef<PaymentNewCreateModalRef>(null);
  const defaultCreditCard = getDefaultCreditCard(creditCards);
  const payPayPaymentMethod = paymentMethods.find((paymentMethod) =>
    isPayPayPaymentMethod(paymentMethod.attributes.name)
  );
  const konbiniPaymentMethod = paymentMethods.find((paymentMethod) =>
    isKonbiniPaymentMethod(paymentMethod.attributes.name)
  );

  useEffect(() => {
    if (defaultCreditCard) {
      const defaultCreditCardPaymentMethodId =
        defaultCreditCard.relationships.payment_method?.data?.id;
      setActivePaymentMethod({
        id: `${defaultCreditCardPaymentMethodId}`,
        type: availablePaymentMethod.creditCard,
        creditCard: defaultCreditCard
      });
    }
  }, [defaultCreditCard]);

  return (
    <>
      {hasCreditCard ? (
        <>
          <PaymentList
            activePaymentMethod={activePaymentMethod}
            creditCards={creditCards}
            onValueChange={setActivePaymentMethod}
            payPayPaymentMethod={payPayPaymentMethod}
            konbiniPaymentMethod={konbiniPaymentMethod}
          />
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
