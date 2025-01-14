import FamilyMart from '@/assets/payment/family-mart.svg';
import Lawson from '@/assets/payment/lawson.svg';
import MiniStop from '@/assets/payment/mini-stop.svg';
import Paypay from '@/assets/payment/paypay.svg';
import SeikoMart from '@/assets/payment/seiko-mart.svg';
import Store from '@/assets/payment/store.svg';

import { RadioGroup } from '@/components/ui/radio-group';
import { PaymentCreditCardOption } from '@/features/payment/components/payment-credit-card-ption';
import {
  PaymentDeleteModal,
  PaymentDeleteModalRef
} from '@/features/payment/components/payment-delete-modal';
import { PaymentMethodOption } from '@/features/payment/components/payment-method-option';
import { useRef } from 'react';

import { availablePaymentMethod } from '../constants';
import { AvailablePaymentMethod, CreditCard, PaymentMethodSchema } from '../types';
import {
  isCreditCardPaymentMethodType,
  isKonbiniPaymentMethod,
  isPayPayPaymentMethod
} from '../utils';

type Props = {
  activePaymentMethod: AvailablePaymentMethod | null;
  creditCards: CreditCard[];
  onValueChange: (paymentMethod: AvailablePaymentMethod) => void;
  payPayPaymentMethod: PaymentMethodSchema | undefined;
  konbiniPaymentMethod: PaymentMethodSchema | undefined;
};

export function PaymentList({
  activePaymentMethod,
  creditCards,
  onValueChange,
  payPayPaymentMethod,
  konbiniPaymentMethod
}: Props) {
  const paymentDeleteModalRef = useRef<PaymentDeleteModalRef>(null);

  function handleValueChange(value: string) {
    // クレジットカードかどうかを判定
    const creditCard = creditCards.find((c) => c.id === value);
    if (creditCard) {
      const id = creditCard.relationships.payment_method?.data?.id;
      if (!id) return;
      onValueChange({
        id,
        type: availablePaymentMethod.creditCard,
        creditCard
      });
      return;
    }

    // PayPayの場合
    if (isPayPayPaymentMethod(value) && payPayPaymentMethod) {
      onValueChange({
        id: payPayPaymentMethod.id,
        type: availablePaymentMethod.paypay
      });
      return;
    }

    // コンビニの場合
    if (isKonbiniPaymentMethod(value) && konbiniPaymentMethod) {
      onValueChange({
        id: konbiniPaymentMethod.id,
        type: availablePaymentMethod.konbini
      });
    }
  }

  return (
    <RadioGroup
      defaultValue={activePaymentMethod?.id}
      onValueChange={handleValueChange}
      className="flex flex-col gap-4"
    >
      {/* PayPay決済 */}
      <PaymentMethodOption
        labelKey={availablePaymentMethod.paypay}
        icon={<Paypay />}
        title="PayPay"
        isChecked={isPayPayPaymentMethod(activePaymentMethod?.type)}
      />

      {/* コンビニ決済 */}
      <PaymentMethodOption
        labelKey={availablePaymentMethod.konbini}
        icon={<Store />}
        title="コンビニ決済"
        isChecked={isKonbiniPaymentMethod(activePaymentMethod?.type)}
        konbiniLogos={
          <>
            <FamilyMart />
            <Lawson />
            <MiniStop />
            <SeikoMart />
          </>
        }
      />

      {/* クレジットカード一覧 */}
      {creditCards.map((creditCard) => {
        const isSelected =
          isCreditCardPaymentMethodType(activePaymentMethod) &&
          activePaymentMethod.creditCard.id === creditCard.id;

        return (
          <PaymentCreditCardOption
            key={creditCard.id}
            creditCard={creditCard}
            isSelected={isSelected}
            paymentDeleteModalRef={paymentDeleteModalRef}
          />
        );
      })}

      {isCreditCardPaymentMethodType(activePaymentMethod) && (
        <PaymentDeleteModal
          ref={paymentDeleteModalRef}
          creditCard={activePaymentMethod.creditCard}
        />
      )}
    </RadioGroup>
  );
}
