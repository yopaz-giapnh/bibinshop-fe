import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import CheckoutConfirm from '@/features/checkout/components/checkout-confirm';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center p-4">
          <LoadingSpinner />
          <Typography element="p" as="boldSmall" className="mt-2">
            リダイレクト中...
          </Typography>
        </div>
      }
    >
      <CheckoutConfirm />
    </Suspense>
  );
}
