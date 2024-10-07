import { BackButton } from '@/components/button/back-button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { getAccountAddresses } from '@/features/address/actions';
import { getCart } from '@/features/cart/actions';
import { CheckoutForm } from '@/features/checkout/components/checkout-form';
import { getAccountCreditCards } from '@/features/payment/actions';
import { getAvailablePoints } from '@/features/point-balance/actions';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page() {
  const cart = await getCart();
  const isCartEmpty = !cart || cart?.attributes.item_count === 0;

  if (isCartEmpty) {
    return redirect('/cart');
  }

  return (
    <div className="h-full w-full bg-paleFrostBlue px-[8px] md:px-0">
      <div className="mx-auto flex w-full flex-col items-center pt-[73px] md:pb-[80px] md:pt-[128px]">
        <div className="flex h-full w-full flex-col">
          <div className="mt-[16px] flex w-full items-center justify-between md:mt-6 md:justify-center">
            <BackButton />
            <Typography
              as="boldTitle"
              element="h1"
              className="text-center text-[16px] text-text-100  md:text-[24px]"
            >
              購入手続き
            </Typography>
            <div className="h-7 w-7" />
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <CheckoutForm
              cart={cart}
              getAccountAddresses={getAccountAddresses()}
              getAccountCreditCards={getAccountCreditCards()}
              getAvailablePoints={getAvailablePoints()}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
