'use client';

import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Cart } from '@/features/cart/types';
import { stripePromise } from '@/features/payment/constants';
import {
  isCreditCardPaymentMethod,
  isKonbiniPaymentMethod,
  isPayPayPaymentMethod
} from '@/features/payment/utils';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import {
  completeCreditCardCheckout,
  completeKonbiniCheckout,
  completePayPayCheckout
} from '../actions';

type Props = {
  cart: Cart;
};

function Form({ cart }: Props) {
  const router = useRouter();
  const stripe = useStripe();

  const paymentMethodName =
    cart.payments?.[cart.payments.length - 1]?.attributes.payment_method_name;
  const isCreditCardUsed = isCreditCardPaymentMethod(paymentMethodName);
  const isPayPayUsed = isPayPayPaymentMethod(paymentMethodName);
  const isKonibiUsed = isKonbiniPaymentMethod(paymentMethodName);

  const onSubmit = async () => {
    if (isCreditCardUsed) {
      await completeCreditCardCheckout();
    } else if (isPayPayUsed) {
      await completePayPayCheckout();
    } else if (isKonibiUsed) {
      await completeKonbiniCheckout();
    }
  };

  return (
    <form action={onSubmit} className="w-full md:w-auto">
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
