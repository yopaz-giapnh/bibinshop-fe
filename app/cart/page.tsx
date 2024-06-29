import { BackButton } from '@/components/button/back-button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { Cart } from '@/features/cart/components/cart';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <div className="h-full w-full bg-paleFrostBlue">
      <div className="mx-auto flex w-full flex-col items-center pt-[73px] md:h-screen md:pt-[128px]">
        <div className="flex h-full  w-full flex-col">
          <div className="mx-3 mt-3 flex justify-between md:block">
            <BackButton />
            <Typography
              as="boldTitle"
              element="h1"
              className="text-center text-[18px] text-text-100 md:mt-6 md:text-[24px]"
            >
              カート
            </Typography>
            <div className="h-7 w-7" />
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
