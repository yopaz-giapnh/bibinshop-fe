import AccountSideBar from '@/features/account/components/side-bar';
import ProfileDetail from '@/features/account/profile/components/profile-detail';
import { SpProfileDetailSkeleton } from '@/features/account/profile/components/skeletons/sp-profile-detail-skeleton';
import { Suspense } from 'react';

/**
 * SP版ユーザープロフィールホーム画面
 * @returns JSX.Element
 */
export default async function Page() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center bg-paleFrostBlue p-[16px] md:hidden">
      <Suspense fallback={<SpProfileDetailSkeleton />}>
        <ProfileDetail isSpHomeProfile={true} />
      </Suspense>
      <AccountSideBar />
    </div>
  );
}
