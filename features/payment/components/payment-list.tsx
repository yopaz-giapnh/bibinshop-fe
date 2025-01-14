import FamilyMart from '@/assets/payment/family-mart.svg';
import Lawson from '@/assets/payment/lawson.svg';
import MiniStop from '@/assets/payment/mini-stop.svg';
import Paypay from '@/assets/payment/paypay.svg';
import SeikoMart from '@/assets/payment/seiko-mart.svg';
import Store from '@/assets/payment/store.svg';
import Trash from '@/assets/trash-blue.svg';
import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { availablePaymentMethod } from '../constants';
import { AvailablePaymentMethod, CreditCard, PaymentMethodSchema } from '../types';
import {
  getCreditCardBrandIcon,
  isCreditCardPaymentMethodType,
  isKonbiniPaymentMethod,
  isPayPayPaymentMethod
} from '../utils';
import { PaymentDeleteModal, PaymentDeleteModalRef } from './payment-delete-modal';

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
    const creditCard = creditCards.find((creditCard) => creditCard.id === value);
    if (creditCard) {
      const id = `${creditCard.relationships.payment_method?.data?.id}`;
      onValueChange({
        id,
        type: availablePaymentMethod.creditCard,
        creditCard
      });
      return;
    }

    const isPayPay = isPayPayPaymentMethod(value);
    if (isPayPay && payPayPaymentMethod) {
      onValueChange({
        id: payPayPaymentMethod.id,
        type: availablePaymentMethod.paypay
      });
      return;
    }

    const isKonbini = isKonbiniPaymentMethod(value);
    if (isKonbini && konbiniPaymentMethod) {
      onValueChange({
        id: konbiniPaymentMethod.id,
        type: availablePaymentMethod.konbini
      });
      return;
    }
  }

  return (
    <RadioGroup
      defaultValue={activePaymentMethod?.id}
      onValueChange={handleValueChange}
      className="flex flex-col gap-4"
    >
      <label key={availablePaymentMethod.paypay} className="cursor-pointer">
        <div
          className={cn(
            'flex w-[458px] items-center gap-4 rounded-[6px] border border-solid border-black-10 p-4',
            isPayPayPaymentMethod(activePaymentMethod?.type) && 'border-bibinBlue-100 bg-[#F6FBFF]'
          )}
        >
          <RadioGroupItem value={availablePaymentMethod.paypay} />
          <Paypay />
          <Typography as="body" element="p" className="text-black-80">
            PayPay
          </Typography>
        </div>
      </label>

      <label key={availablePaymentMethod.konbini} className="cursor-pointer">
        <div
          className={cn(
            'flex w-[458px] items-center gap-4 rounded-[6px] border border-solid border-black-10 p-4',
            isKonbiniPaymentMethod(activePaymentMethod?.type) && 'border-bibinBlue-100 bg-[#F6FBFF]'
          )}
        >
          <RadioGroupItem value={availablePaymentMethod.konbini} />
          <Store />
          <div className="flex flex-col gap-2">
            <Typography as="body" element="p" className="text-black-80">
              コンビニ決済
            </Typography>
            <div className="flex items-center gap-2">
              <FamilyMart />
              <Lawson />
              <MiniStop />
              <SeikoMart />
            </div>
          </div>
        </div>
      </label>

      {creditCards.map((creditCard) => {
        const isSelected =
          isCreditCardPaymentMethodType(activePaymentMethod) &&
          activePaymentMethod.creditCard.id === creditCard.id;

        return (
          <label key={creditCard.id} className="cursor-pointer">
            <div
              className={cn(
                'flex w-[458px] flex-col justify-between rounded-[6px] border border-solid border-black-10 p-4 md:flex-row md:items-center',
                isSelected && 'border-bibinBlue-100 bg-[#F6FBFF]'
              )}
            >
              <div className="flex w-full items-center gap-4">
                <RadioGroupItem value={creditCard.id.toString()} checked={isSelected} />
                {getCreditCardBrandIcon(creditCard)}
                <Typography as="body" element="p" className="text-black-80">
                  {creditCard.attributes.name}
                </Typography>
                <Typography as="body" element="p" className="text-black-80">
                  {'...' + creditCard.attributes.last_digits}
                </Typography>
              </div>
              <ButtonWithIcon
                buttonProps={{
                  className:
                    'w-[93px] h-10 flex justify-center mt-2 px-2 py-4 border border-bibinBlue-100 rounded-[100px]',
                  onClick: () => {
                    paymentDeleteModalRef.current?.open();
                  }
                }}
                icon={<Trash />}
                text="削除"
                textProps={{ className: 'text-bibinBlue-100' }}
              />
            </div>
            <PaymentDeleteModal ref={paymentDeleteModalRef} creditCard={creditCard} />
          </label>
        );
      })}
    </RadioGroup>
  );
}
