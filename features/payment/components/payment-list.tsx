import Trash from '@/assets/trash-blue.svg';
import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Typography } from '@/components/ui/typography';
import { useCheckout } from '@/features/checkout/components/checkout-ctx';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { CreditCard, PaymentMethodSchema } from '../types';
import { getCreditCardBrandIcon } from '../utils';
import { PaymentDeleteModal, PaymentDeleteModalRef } from './payment-delete-modal';

type Props = {
  creditCards: CreditCard[];
  paymentMethods: PaymentMethodSchema[];
};

export function PaymentList({ creditCards, paymentMethods }: Props) {
  const paymentDeleteModalRef = useRef<PaymentDeleteModalRef>(null);

  const { setActiveCreditCard, setActivePaymentMethodId, activePaymentMethodId, activeCreditCard } =
    useCheckout();

  const creditCardPaymentMethodId = paymentMethods.find(
    (method) => method.attributes.name?.toLowerCase() === 'stripe'
  )?.id;
  const paypayPaymentMethodId = paymentMethods.find(
    (method) => method.attributes.name?.toLowerCase() === 'paypay'
  )?.id;
  const konbiniPaymentMethodId = paymentMethods.find(
    (method) => method.attributes.name?.toLowerCase() === 'コンビニ決済'
  )?.id;

  const paypayValue = paypayPaymentMethodId ? paypayPaymentMethodId.toString() : 'paypay';
  const konbiniValue = konbiniPaymentMethodId ? konbiniPaymentMethodId.toString() : 'コンビニ決済';
  const isKonbiniSelected =
    activeCreditCard == null && activePaymentMethodId === konbiniPaymentMethodId;

  let currentValue: string;
  if (activePaymentMethodId === paypayPaymentMethodId) {
    currentValue = paypayValue;
  } else if (activeCreditCard?.id) {
    currentValue = activeCreditCard.id.toString();
  } else {
    currentValue = paypayValue;
  }

  const handleChange = (value: string) => {
    if (value === paypayValue) {
      setActiveCreditCard(null);
      if (paypayPaymentMethodId) {
        setActivePaymentMethodId(paypayPaymentMethodId);
      }
    } else {
      const creditCard = creditCards.find((card) => card.id.toString() === value);
      if (creditCard) {
        setActiveCreditCard(creditCard);
        if (creditCardPaymentMethodId) {
          setActivePaymentMethodId(creditCardPaymentMethodId);
        }
      }
    }
  };

  return (
    <RadioGroup value={currentValue} onValueChange={handleChange} className="flex flex-col">
      <label key={paypayValue} className="mb-2 flex cursor-pointer items-center">
        <div
          className={cn(
            'flex w-[458px] flex-col justify-between rounded-[6px] border border-solid border-black-10 p-4 md:flex-row md:items-center',
            currentValue === paypayValue && 'border-bibinBlue-100 bg-[#F6FBFF]'
          )}
        >
          <div className="flex w-full items-center gap-4">
            <RadioGroupItem value={paypayValue} />
            <Typography as="body" element="p" className="text-black-80">
              PayPayで支払う
            </Typography>
          </div>
        </div>
      </label>

      {/* TODO: コンビニ決済のデザインに合わせる */}
      <label key={konbiniValue} className="mb-2 flex cursor-pointer items-center">
        <div
          className={cn(
            'flex w-[458px] flex-col justify-between rounded-[6px] border border-solid border-black-10 p-4 md:flex-row md:items-center',
            isKonbiniSelected && 'border-bibinBlue-100'
          )}
        >
          <div className="flex w-full items-center gap-4">
            <RadioGroupItem value={konbiniValue} checked={isKonbiniSelected} />
            <Typography as="body" element="p" className="text-black-80">
              コンビニ決済
            </Typography>
          </div>
        </div>
      </label>

      {creditCards.map((creditCard) => {
        const isSelected = currentValue === creditCard.id.toString();

        return (
          <label key={creditCard.id} className="flex cursor-pointer items-center">
            <div
              className={cn(
                'flex w-[458px] flex-col justify-between rounded-[6px] border border-solid border-black-10 p-4 md:flex-row md:items-center',
                isSelected && 'border-bibinBlue-100 bg-[#F6FBFF]'
              )}
            >
              <div className="flex w-full items-center gap-4">
                <RadioGroupItem value={creditCard.id.toString()} />
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
