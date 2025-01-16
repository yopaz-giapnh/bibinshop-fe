import { Skeleton } from '@/components/ui/skeleton';

const ReviewItemSkeleton = () => (
  <div className="flex w-full">
    {/* アバター */}
    <Skeleton className="h-[40px] w-[40px] rounded-full" />
    <div className="ml-3 md:ml-6">
      {/* ユーザー情報と評価 */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-28" />
      </div>
      {/* レビューテキスト */}
      <div className="mt-4 max-w-[285px] md:max-w-[42vw]">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-1 h-4 w-[90%]" />
        <Skeleton className="mt-1 h-4 w-[80%]" />
      </div>
      {/* アクションボタン */}
      <div className="mt-[16px] flex gap-2">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  </div>
);

export const ReviewListWithAvatorSkeleton = () => (
  <div className="flex flex-col px-4 md:px-0">
    <div className="mt-4 flex flex-col gap-6">
      {[...Array(3)].map((_, i) => (
        <ReviewItemSkeleton key={i} />
      ))}
    </div>
  </div>
);
