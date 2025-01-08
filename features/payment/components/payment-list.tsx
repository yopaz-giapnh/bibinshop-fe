import Trash from '@/assets/trash-blue.svg';
import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Typography } from '@/components/ui/typography';
import { useCheckout } from '@/features/checkout/components/checkout-ctx';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { CreditCard } from '../types';
import { getCreditCardBrandIcon } from '../utils';
import { PaymentDeleteModal, PaymentDeleteModalRef } from './payment-delete-modal';

type Props = {
  activeCreditCard?: CreditCard | null;
  creditCards: CreditCard[];
};

export function PaymentList({ activeCreditCard, creditCards }: Props) {
  const paymentDeleteModalRef = useRef<PaymentDeleteModalRef>(null);
  const { setActiveCreditCard } = useCheckout();

  return (
    <RadioGroup
      defaultValue={activeCreditCard?.id.toString()}
      onValueChange={(value) => {
        const creditCard = creditCards.find((creditCard) => creditCard.id === value);
        if (creditCard) {
          setActiveCreditCard(creditCard);
        }
      }}
      className="flex flex-col"
    >
      {creditCards.map((creditCard) => {
        const isSelected = activeCreditCard?.id === creditCard.id;

        return (
          <label key={creditCard.id} className="flex cursor-pointer items-center">
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
