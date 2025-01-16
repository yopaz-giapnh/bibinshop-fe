import { Skeleton } from '@/components/ui/skeleton';

export const SpProfileDetailSkeleton = () => (
  <div className="h-full">
    {/* プロフィールヘッダー */}
    <div className="flex h-[90px] pl-[16px] md:ml-[24px] md:mr-0 md:h-fit md:justify-normal md:pl-0">
      {/* アバター */}
      <div className="relative h-[84px] w-[88px] md:h-[154px] md:w-[160px]">
        <Skeleton className="h-full w-full rounded-full bg-gray-200" />
      </div>
      {/* プロフィール情報 */}
      <div className="ml-[16px] flex flex-col items-start justify-between">
        <div className="items-center md:flex">
          <Skeleton className="h-7 w-40 bg-gray-200 md:mr-4" />
          <Skeleton className="mt-2 h-10 w-28 rounded-lg bg-gray-200 md:mt-0" />
        </div>
      </div>
    </div>
  </div>
);
