import Address from '@/features/account/address/components/address';
import { AddressSkeleton } from '@/features/account/address/components/skeletons/address-skeleton';
import { getAccountAddresses } from '@/features/address/actions';
import { Suspense } from 'react';

/**
 * お届け先住所ホーム画面
 * @returns JSX.Element
 */
export default async function Page() {
  return (
    <div className="mx-auto mb-[200px] flex w-full flex-col items-center bg-paleFrostBlue p-[16px] md:mb-0 md:h-screen md:p-[24px]">
      <Suspense fallback={<AddressSkeleton />}>
        <Address getAccountAddresses={getAccountAddresses()} />
      </Suspense>
    </div>
  );
}
