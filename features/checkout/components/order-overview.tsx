'use client';

import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { Address } from '@/features/address/types';
import { Cart } from '@/features/cart/types';
import { CreditCard } from '@/features/payment/types';
import { useFormState, useFormStatus } from 'react-dom';
import { updateCheckout } from '../actions';

type Props = {
  cart: Cart;
  canOrder: boolean;
  address: Address;
  creditCard: CreditCard;
};

export function OrderOverview({ cart, canOrder, address, creditCard }: Props) {
  const [state, formAction] = useFormState(updateCheckout, null);
  const action = formAction.bind(null, { address, creditCard });

  return (
    <>
      <div className="mt-4 flex justify-between">
        <Typography as="caption" element="p" className="text-black-90">
          {`商品金額(${cart.attributes.item_count})`}
        </Typography>
        <Typography as="caption" element="p" className="text-black-90">
          {cart.attributes.display_item_total}
        </Typography>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-t-black-10 py-4">
        <Typography as="caption" element="p" className="text-black-90">
          小計
        </Typography>
        <Typography as="title" element="p" className="text-black-90">
          {cart.attributes.display_item_total}
        </Typography>
      </div>
      <form action={action} className="flex">
        <div className="w-1/2 md:hidden">
          <Typography as="title" element="p" className="text-black-90">
            {cart.attributes.display_item_total}
          </Typography>
        </div>
        <div className="w-full md:w-full">
          <OrderConfirmButton disabled={!canOrder} />
        </div>
      </form>
    </>
  );
}

function OrderConfirmButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button size="lg" variant="lg" className="w-full" disabled={pending || disabled}>
      {pending ? <LoadingSpinner /> : '次へ進む'}
    </Button>
  );
}
