import { Skeleton } from '@/components/ui/skeleton';

const WriteReviewItemSkeleton = () => (
  <div className="mt-[24px] w-full rounded-[6px] bg-white-base p-[16px] shadow-sm">
    <div className="flex">
      {/* 商品画像 */}
      <Skeleton className="h-[100px] w-[100px]" />
      <div className="ml-[16px] md:ml-[8px]">
        {/* 商品名 */}
        <Skeleton className="h-[56px] w-[200px] md:w-[300px]" />
      </div>
    </div>
    {/* 総合評価 */}
    <div className="mt-[12px] border-t border-gray-200 pt-[12px]">
      <Skeleton className="mb-2 h-6 w-24" />
      <Skeleton className="h-7 w-36" />
    </div>
    {/* 項目評価 */}
    <div className="mt-[12px] border-b border-gray-200 pb-[12px]">
      <Skeleton className="mb-4 h-6 w-24" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="mb-4 flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-7 w-36" />
        </div>
      ))}
    </div>
    {/* レビュー */}
    <div className="mt-[12px]">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-48" />
      </div>
      <Skeleton className="mt-[8px] h-[160px] w-full" />
      <Skeleton className="mt-2 h-4 w-24 self-end" />
    </div>
  </div>
);

export const WriteReviewFormSkeleton = () => (
  <div className="w-full">
    <div className="flex w-full flex-col items-center">
      <div className="w-full">
        {[...Array(2)].map((_, i) => (
          <WriteReviewItemSkeleton key={i} />
        ))}
      </div>
      {/* 提出ボタン */}
      <Skeleton className="m-[16px] mt-[24px] h-12 w-full rounded-full md:w-[392px]" />
    </div>
  </div>
);
