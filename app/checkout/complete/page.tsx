import CheckoutComplete from '@/features/checkout/components/checkout-complete';
import { CheckoutCompleteSkeleton } from '@/features/checkout/components/skeletons/checkout-complete-skeleton';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <div className="h-full w-full bg-paleFrostBlue">
      <div className="mx-auto flex w-full flex-col items-center pb-[80px] pt-[73px] md:pt-[128px]">
        <Suspense fallback={<CheckoutCompleteSkeleton />}>
          <CheckoutComplete />
        </Suspense>
      </div>
    </div>
  );
}
