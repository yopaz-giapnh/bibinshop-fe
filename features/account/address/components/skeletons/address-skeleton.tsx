import { BackButton } from '@/components/button/back-button';
import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';
import { AddressCardSkeleton } from './address-card-skeleton';

export const AddressSkeleton = () => (
  <>
    {/* ヘッダー */}
    <div className="mb-[24px] flex w-full items-center justify-between md:justify-center">
      <BackButton />
      <Typography as="boldXLarge" element="p" className="text-[16px] text-black-90 md:text-[24px]">
        お届け先住所
      </Typography>
      <div className="h-7 w-7" />
    </div>

    {/* 住所追加ボタン */}
    <div className="flex justify-center">
      <Skeleton className="h-[50px] w-[200px] rounded-full bg-gray-200" />
    </div>

    {/* 住所カードリスト */}
    <div className="w-full overflow-y-auto md:mt-[24px] md:w-[592px]">
      {[...Array(3)].map((_, index) => (
        <AddressCardSkeleton key={index} />
      ))}
    </div>
  </>
);
