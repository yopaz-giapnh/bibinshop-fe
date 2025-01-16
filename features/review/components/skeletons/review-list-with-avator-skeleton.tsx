import { Skeleton } from '@/components/ui/skeleton';

const ReviewItemSkeleton = () => (
  <div className="flex w-full">
    {/* アバター */}
    <Skeleton className="h-[40px] w-[40px] animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    <div className="ml-3 md:ml-6">
      {/* ユーザー情報と評価 */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-20 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <Skeleton className="h-4 w-4 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <Skeleton className="h-4 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <Skeleton className="h-4 w-4 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <Skeleton className="h-4 w-28 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>
      {/* レビューテキスト */}
      <div className="mt-4 max-w-[285px] md:max-w-[42vw]">
        <Skeleton className="h-4 w-full animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <Skeleton className="mt-1 h-4 w-[90%] animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <Skeleton className="mt-1 h-4 w-[80%] animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>
      {/* アクションボタン */}
      <div className="mt-[16px] flex gap-2">
        <Skeleton className="h-8 w-24 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <Skeleton className="h-8 w-24 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
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
