import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { apiClient } from '@/config/api-client';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
  searchParams: {
    orderNumber?: string;
    merchant_payment_id?: string;
    payment_id?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const { merchant_payment_id: merchantPaymentId, payment_id: paymentId } = searchParams;

  if (paymentId) {
    try {
      const response = await apiClient.PUT('/api/v2/storefront/payments/{id}/update_state', {
        params: {
          path: {
            id: paymentId,
          },
        },
        body: {
          payment: {
            state: 'completed',
          },
          merchant_payment_id: merchantPaymentId,
        },
      });
      console.log('response', response);
    } catch (error) {
      console.error('Error while updating payment state:', error);
      return null;
    } finally {
      redirect('/checkout/complete');
    }
  }

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
    </Suspense>
  );
}