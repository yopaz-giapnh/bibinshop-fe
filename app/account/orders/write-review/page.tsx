import { BackButton } from '@/components/button/back-button';
import { Typography } from '@/components/ui/typography';
import { AnimatedWriteReviewContainer } from '@/features/account/order-history/components/animated-write-review-container';
import WriteReview from '@/features/account/order-history/components/write-review';
import { Suspense } from 'react';

/**
 * ユーザープロフィールレビューを書く画面ホーム
 * @returns JSX.Element
 */
export default async function Page({
  searchParams
}: {
  searchParams?: { slug?: string[] | string };
}) {
  const slugs = Array.isArray(searchParams?.slug)
    ? searchParams?.slug
    : [searchParams?.slug || ''].filter(Boolean);

  return (
    <AnimatedWriteReviewContainer>
      <div className="mx-auto flex w-full flex-col items-center bg-paleFrostBlue p-[16px] md:p-[24px]">
        <div className="mb-[16px] flex w-full items-center justify-between md:mb-[24px] md:justify-center ">
          <BackButton />
          <Typography
            as="boldXLarge"
            element="p"
            className="text-[16px] text-black-90 md:text-[24px]"
          >
            レビューを書く
          </Typography>
          <div className="h-7 w-7" />
        </div>
        <Suspense>
          <WriteReview slugs={slugs} />
        </Suspense>
      </div>
    </AnimatedWriteReviewContainer>
  );
}
