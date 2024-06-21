import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { Cart } from '@/features/cart/components/cart';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <div className="h-full w-full bg-paleFrostBlue">
      <div className="mx-auto flex h-screen w-full flex-col items-center pt-[128px]">
        <div className="flex h-full w-full flex-col">
          <Typography as="boldTitle" element="h1" className="mt-6 text-center text-text-80">
            カート
          </Typography>
          <Suspense fallback={<LoadingSpinner />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
