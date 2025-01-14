import Trash from '@/assets/trash-blue.svg';
import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Typography } from '@/components/ui/typography';
import { PaymentDeleteModalRef } from '@/features/payment/components/payment-delete-modal';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';
import { CreditCard } from '../types';
import { getCreditCardBrandIcon } from '../utils';

type PaymentCreditCardOptionProps = {
  creditCard: CreditCard;
  isSelected: boolean;
  paymentDeleteModalRef: React.RefObject<PaymentDeleteModalRef>;
};

export function PaymentCreditCardOption({
  creditCard,
  isSelected,
  paymentDeleteModalRef
}: PaymentCreditCardOptionProps) {
  const handleDeleteClick = useCallback(() => {
    paymentDeleteModalRef.current?.open();
  }, [paymentDeleteModalRef]);

  return (
    <label key={creditCard.id} className="cursor-pointer" htmlFor={creditCard.id}>
      <div
        className={cn(
          'flex w-[458px] flex-col justify-between rounded-[6px] border border-solid border-black-10 p-4 md:flex-row md:items-center',
          isSelected && 'border-bibinBlue-100 bg-[#F6FBFF]'
        )}
      >
        <div className="flex w-full items-center gap-4">
          <RadioGroupItem value={creditCard.id} checked={isSelected} id={creditCard.id} />
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
            onClick: handleDeleteClick
          }}
          icon={<Trash />}
          text="削除"
          textProps={{ className: 'text-bibinBlue-100' }}
        />
      </div>
    </label>
  );
}
