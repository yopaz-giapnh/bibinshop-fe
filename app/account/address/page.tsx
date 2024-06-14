import Address from '@/features/account/address/components/address';
import { getAccountAddresses } from '@/features/address/actions';
import { Suspense } from 'react';

/**
 * お届け先住所ホーム画面
 * @returns JSX.Element
 */
export default async function Page() {
  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center bg-paleFrostBlue p-[24px]">
      <Suspense fallback={<div>Loading...</div>}>
        <Address getAccountAddresses={getAccountAddresses()} />
      </Suspense>
    </div>
  );
}
