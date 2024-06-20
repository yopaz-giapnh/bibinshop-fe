import { LoadingSpinner } from '@/components/ui/loading-spinner';
import ProfileDetail from '@/features/account/profile/components/profile-detail';
import ProfileReviewList from '@/features/account/profile/components/profile-review-list';
import { Suspense } from 'react';

/**
 * ユーザープロフィールホーム画面
 * @returns JSX.Element
 */
export default async function Page() {
  return (
    <div className="mx-auto flex h-screen w-full flex-col justify-center bg-paleFrostBlue p-[24px]">
      <Suspense fallback={<LoadingSpinner />}>
        <ProfileDetail />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <ProfileReviewList />
      </Suspense>
    </div>
  );
}
