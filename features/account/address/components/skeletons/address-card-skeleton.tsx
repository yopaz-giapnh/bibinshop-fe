import { Skeleton } from '@/components/ui/skeleton';

export const AddressCardSkeleton = () => (
  <div className="mt-[16px] flex w-full items-center rounded-[6px] border border-solid border-black-10 bg-white-base p-4 shadow-base md:mt-0">
    <div className="flex w-full flex-col justify-center gap-4 md:w-[calc(100%_-_93px)]">
      {/* 名前と電話番号 */}
      <div className="flex w-full flex-none gap-4 md:flex-col">
        <Skeleton className="h-6 w-32 bg-gray-200 md:h-7" />
        <Skeleton className="h-5 w-28 bg-gray-200 md:h-6" />
      </div>

      {/* 住所情報 */}
      <div className="w-2/3">
        <Skeleton className="h-5 w-24 bg-gray-200 md:h-6" />
        <Skeleton className="mt-1 h-5 w-full bg-gray-200 md:h-6" />
      </div>

      {/* モバイル用ボタン */}
      <div className="flex w-2/3 gap-2 md:hidden">
        <Skeleton className="h-10 flex-1 rounded-full bg-gray-200" />
        <Skeleton className="h-10 flex-1 rounded-full bg-gray-200" />
      </div>
    </div>

    {/* PC用ボタン */}
    <div className="hidden w-2/3 gap-2 md:flex">
      <Skeleton className="h-10 w-[93px] rounded-full bg-gray-200" />
      <Skeleton className="h-10 w-[93px] rounded-full bg-gray-200" />
    </div>
  </div>
);
