import { BackButton } from '@/components/button/back-button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { getAccount } from '@/features/account/profile/actions';
import SecurityDetail from '@/features/account/security/components/security-detail';
import { Suspense } from 'react';

/**
 * アカウントセキュリティホーム画面
 * @returns JSX.Element
 */
export default async function Page() {
  return (
    <div className="mx-auto mb-[200px] flex w-full flex-col items-center bg-paleFrostBlue p-[16px] md:mb-0 md:h-screen md:p-[24px]">
      <div className="mb-[14px] flex w-full items-center justify-between md:mb-[24px] md:justify-center">
        <BackButton />
        <Typography
          as="boldXLarge"
          element="p"
          className="text-[18px] text-black-90 md:text-[24px]"
        >
          アカウントセキュリティ
        </Typography>
        <div className="h-7 w-7" />
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <SecurityDetail getAccount={getAccount()} />
      </Suspense>
    </div>
  );
}
