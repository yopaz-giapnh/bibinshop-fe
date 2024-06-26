import { BackButton } from '@/components/button/back-button';
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
    <div className="mx-auto flex h-screen w-full flex-col items-center bg-paleFrostBlue p-[16px] md:p-[24px]">
      <div className="mb-[16px] flex w-full items-center justify-between md:mb-[24px] md:justify-center ">
        <BackButton />
        <Typography
          as="boldXLarge"
          element="p"
          className="text-[16px] text-black-90 md:text-[24px]"
        >
          お支払い方法
        </Typography>
        <div className="h-7 w-7" />
      </div>
      <PaymentCreate />
      <Suspense fallback={<LoadingSpinner />}>
        <PaymentList />
      </Suspense>
    </div>
  );
}
