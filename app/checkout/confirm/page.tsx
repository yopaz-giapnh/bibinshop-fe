import { BackButton } from '@/components/button/back-button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import CheckoutConfirm from '@/features/checkout/components/checkout-confirm';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <div className="h-full w-full bg-paleFrostBlue">
      <div className="mx-auto flex w-full flex-col items-center pb-[80px] pt-[73px] md:pt-[128px]">
        <div className="h-full w-full bg-paleFrostBlue">
          <div className="mx-auto flex w-full flex-col items-center pt-[16px] md:pt-[24px]">
            <div className="flex w-full items-center justify-between px-[8px] md:justify-center">
              <BackButton />
              <Typography
                as="boldTitle"
                element="h1"
                className="text-[16px] text-text-100 md:text-[24px]"
              >
                購入確認
              </Typography>
              <div className="h-7 w-7" />
            </div>
            <Suspense fallback={<LoadingSpinner />}>
              <CheckoutConfirm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
