import { LoadingSpinner } from '@/components/ui/loading-spinner';
import AccountSideBar from '@/features/account/components/side-bar';
import ProfileDetail from '@/features/account/profile/components/profile-detail';
import { Suspense } from 'react';

/**
 * SP版ユーザープロフィールホーム画面
 * @returns JSX.Element
 */
export default async function Page() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center bg-paleFrostBlue p-[16px] md:hidden">
      <Suspense fallback={<LoadingSpinner />}>
        <ProfileDetail />
      </Suspense>
      <AccountSideBar />
    </div>
  );
}
