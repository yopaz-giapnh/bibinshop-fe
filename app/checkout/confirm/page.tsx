import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import CheckoutConfirm from '@/features/checkout/components/checkout-confirm';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <div className="h-full w-full bg-paleFrostBlue">
      <div className="mx-auto flex w-full flex-col items-center pb-[80px] pt-[128px]">
        <div className="h-full w-full bg-paleFrostBlue">
          <div className="mx-auto flex w-full flex-col items-center pt-[24px]">
            <Typography as="boldTitle" element="h2" className="text-text-80">
              購入確認
            </Typography>
            <Suspense fallback={<LoadingSpinner />}>
              <CheckoutConfirm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
