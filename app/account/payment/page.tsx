import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import PaymentCreate from '@/features/account/payment/components/payment-create';
import PaymentList from '@/features/account/payment/components/payment-list';
import { Suspense } from 'react';

/**
 * お支払い方法ホーム画面
 * @returns JSX.Element
 */
export default async function Page() {
  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center bg-paleFrostBlue p-[24px]">
      <Typography as="boldXLarge" element="p" className="mb-[24px] text-[24px] text-black-90">
        お支払い方法
      </Typography>
      <PaymentCreate />
      <Suspense fallback={<LoadingSpinner />}>
        <PaymentList />
      </Suspense>
    </div>
  );
}
