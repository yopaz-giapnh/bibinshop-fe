import { Typography } from '@/components/ui/typography';
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
    <div className="mx-auto flex h-screen w-full flex-col items-center bg-paleFrostBlue p-[24px]">
      <Typography as="boldXLarge" element="p" className="mb-[24px] text-[24px] text-black-90">
        レビューを書く
      </Typography>
      <Suspense>
        <WriteReview slugs={slugs} />
      </Suspense>
    </div>
  );
}
