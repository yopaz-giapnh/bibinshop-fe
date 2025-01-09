'use client';

import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Cart } from '@/features/cart/types';
import { useFormStatus } from 'react-dom';
import { completeCheckout } from '../actions';

type Props = {
  cart: Cart;
};

export function CheckoutConfirmForm({ cart }: Props) {
  // ここにpaymentMethodIdを取得する処理を書く

  const payments = cart?.payments;

  const paymentMethodId = payments?.find((payment) => payment.attributes.payment_method_id)?.attributes.payment_method_id;

  // actionに渡す
  const action = completeCheckout;

  return (
    <form action={action} className="w-full md:w-auto">
      <CheckoutButton />
    </form>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center">
      <Button size="lg" variant="lg" className="mt-[24px] w-11/12 md:w-[392px]" disabled={pending}>
        {pending ? <LoadingSpinner /> : '注文する'}
      </Button>
    </div>
  );
}
