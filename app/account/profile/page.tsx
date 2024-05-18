import ProfileDetail from '@/features/account/components/profile-detail';
import ReviewList from '@/features/account/components/review-list';

export default async function Page() {
  return (
    <div className="mx-auto mt-[128px] flex h-screen w-full flex-col justify-center bg-paleFrostBlue p-[24px]">
      <ProfileDetail />
      <ReviewList />
    </div>
  );
}
