'use client';

import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { updatePayPayPaymentState } from '@/features/payment/actions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  searchParams: {
    orderNumber?: string;
    merchant_payment_id?: string;
    payment_id?: string;
  };
};

export default function Page({ searchParams }: Props) {
  const router = useRouter();
  const { merchant_payment_id: merchantPaymentId, payment_id: paymentId } = searchParams;

  useEffect(() => {
    if (!paymentId || !merchantPaymentId) {
      router.replace('/');
      return;
    }

    const updateState = async () => {
      await updatePayPayPaymentState({
        paymentId,
        merchantPaymentId
      });
      router.replace('/checkout/complete');
    };

    updateState();
  }, [merchantPaymentId, paymentId]);

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <LoadingSpinner className="text-bibinBlue-100" />
      <Typography element="p" as="boldSmall" className="mt-2 text-bibinBlue-100">
        リダイレクト中...
      </Typography>
    </div>
  );
}
