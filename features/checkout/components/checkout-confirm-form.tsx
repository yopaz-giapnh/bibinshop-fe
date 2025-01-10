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
  const payments = cart?.payments;
  const paymentMethodId = payments?.find((payment) => payment.attributes.payment_method_id)
    ?.attributes.payment_method_id;
  const orderNumber = cart?.attributes.number;
  const amount = Number(cart?.attributes.total);

  async function handleSubmit() {
    if (!paymentMethodId || !orderNumber || !amount) {
      console.error('決済に必要な情報が不足しています');
      return;
    }

    const payload = { paymentMethodId, orderNumber, amount };

    const result = await completeCheckout(payload);
    if (!result.success) {
      alert('決済に失敗しました');
    }
  }

  return (
    <form action={handleSubmit} className="w-full md:w-auto">
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
