'use client';

import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Cart } from '@/features/cart/types';
import { stripePromise } from '@/features/payment/constants';
import { isPayPayPaymentMethod } from '@/features/payment/utils';
import { Elements } from '@stripe/react-stripe-js';
import { useFormStatus } from 'react-dom';
import { completeCheckout, completePayPayCheckout } from '../actions';

type Props = {
  cart: Cart;
};

function Form({ cart }: Props) {
  const paymentMethodName =
    cart.payments?.[cart.payments.length - 1]?.attributes.payment_method_name;
  const isPayPayUsed = isPayPayPaymentMethod(paymentMethodName);

  const action = isPayPayUsed ? completePayPayCheckout : completeCheckout;

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

export function CheckoutConfirmForm({ cart }: Props) {
  return (
    <Elements stripe={stripePromise}>
      <Form cart={cart} />
    </Elements>
  );
}
