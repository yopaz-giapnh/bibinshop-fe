'use client';

import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useFormStatus } from 'react-dom';
import { completeCheckout } from '../actions';

export function CheckoutConfirmForm() {
  const action = completeCheckout;

  return (
    <form action={action}>
      <CheckoutButton />
    </form>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <Button size="lg" variant="lg" className="mt-[24px] w-[392px]" disabled={pending}>
      {pending ? <LoadingSpinner /> : '注文する'}
    </Button>
  );
}
