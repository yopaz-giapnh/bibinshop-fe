import { BackButton } from '@/components/button/back-button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import ProfileDetail from '@/features/account/profile/components/profile-detail';
import ProfileReviewList from '@/features/account/profile/components/profile-review-list';
import { Suspense } from 'react';

/**
 * ユーザープロフィールホーム画面
 * @returns JSX.Element
 */
export default async function Page({
  searchParams
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="mx-auto mb-[200px] flex w-full flex-col justify-center bg-paleFrostBlue p-[16px] md:mb-0 md:h-screen md:p-[24px]">
      <div className="mb-[24px] flex w-full items-center justify-between md:hidden">
        <BackButton />
        <Typography as="bold" element="p" className="text-[16px]">
          プロフィール
        </Typography>
        <div className="h-7 w-7" />
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <ProfileDetail />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <ProfileReviewList currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
