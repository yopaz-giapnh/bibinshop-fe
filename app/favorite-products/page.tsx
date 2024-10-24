import { BackButton } from '@/components/button/back-button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { FavoriteProducts } from '@/features/favorite-products/components/favorite-products';
import { Suspense } from 'react';

export default async function Page({ searchParams }: { searchParams?: { page?: string } }) {
  return (
    <div className="mx-auto flex w-full flex-col items-center bg-paleFrostBlue p-[16px] pt-[80px] md:p-[24px] md:pt-[150px]">
      <div className="mb-[14px] flex w-full items-center justify-between md:mb-[24px] md:justify-center">
        <BackButton />
        <Typography
          as="boldXLarge"
          element="p"
          className="text-[18px] text-black-90 md:text-[24px]"
        >
          お気に入り
        </Typography>
        <div className="h-7 w-7" />
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <FavoriteProducts searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
