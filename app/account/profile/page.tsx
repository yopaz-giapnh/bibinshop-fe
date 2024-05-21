import ProfileDetail from '@/features/account/profile/components/profile-detail';
import ProfileReviewList from '@/features/account/profile/components/profile-review-list';

/**
 * ユーザープロフィールホーム画面
 * @returns JSX.Element
 */
export default async function Page() {
  return (
    <div className="mx-auto mt-[128px] flex h-screen w-full flex-col justify-center bg-paleFrostBlue p-[24px]">
      <ProfileDetail />
      <ProfileReviewList />
    </div>
  );
}
