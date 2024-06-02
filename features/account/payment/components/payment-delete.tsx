'use client';

import Trash from '@/assets/trash-blue.svg';
import { ButtonWithIcon } from '@/components/button/button-with-icon';
import {
  PaymentDeleteModal,
  PaymentDeleteModalRef
} from '@/features/payment/components/payment-delete-modal';
import { CreditCard } from '@/features/payment/types';
import { useRef } from 'react';

type Props = {
  creditCard: CreditCard;
};

export default function PaymentDelete({ creditCard }: Props) {
  const paymentDeleteModalRef = useRef<PaymentDeleteModalRef>(null);

  return (
    <>
      <ButtonWithIcon
        buttonProps={{
          className:
            'w-[93px] h-5 flex justify-center py-4 border border-bibinBlue-100 rounded-[100px]',
          onClick: () => {
            paymentDeleteModalRef.current?.open();
          }
        }}
        icon={<Trash />}
        text="削除"
        textProps={{ className: 'text-bibinBlue-100' }}
      />

      <PaymentDeleteModal ref={paymentDeleteModalRef} creditCard={creditCard} />
    </>
  );
}
