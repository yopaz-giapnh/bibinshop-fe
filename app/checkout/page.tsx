import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { getCart } from '@/features/cart/actions';
import { CheckoutForm } from '@/features/checkout/components/checkout-form';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page() {
  const cart = await getCart();
  const isCartEmpty = !cart || cart?.attributes.item_count === 0;

  if (isCartEmpty) {
    return redirect('/cart');
  }

  return (
    <div className="h-full w-full bg-paleFrostBlue">
      <div className="mx-auto flex w-full flex-col items-center pt-[128px] md:pb-[80px]">
        <div className="flex h-full w-full flex-col">
          <Typography as="boldTitle" element="h1" className="text-center text-text-80 md:mt-6">
            購入手続き
          </Typography>
          <Suspense fallback={<LoadingSpinner />}>
            <CheckoutForm cart={cart} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
