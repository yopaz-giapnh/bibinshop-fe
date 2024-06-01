'use client';

import { ButtonWithIcon } from '@/components/button/button-with-icon';
import {
  PaymentNewCreateModal,
  PaymentNewCreateModalRef
} from '@/features/payment/components/payment-new-create-modal';
import { CirclePlus } from 'lucide-react';
import { useRef } from 'react';

export default function PaymentCreate() {
  const paymentNewCreateModalRef = useRef<PaymentNewCreateModalRef>(null);

  return (
    <>
      <ButtonWithIcon
        buttonProps={{
          className:
            'h-[20px] flex justify-center px-6 py-5 border border-bibinBlue-100 rounded-[100px]',
          onClick: () => {
            paymentNewCreateModalRef.current?.open();
          }
        }}
        icon={<CirclePlus className="h-6 w-6 text-bibinBlue-100" />}
        text="新しいカードを追加する"
        textProps={{ className: 'text-bibinBlue-100' }}
      />
      <PaymentNewCreateModal ref={paymentNewCreateModalRef} />
    </>
  );
}
