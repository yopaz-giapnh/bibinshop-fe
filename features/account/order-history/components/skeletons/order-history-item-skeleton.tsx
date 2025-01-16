import { Skeleton } from '@/components/ui/skeleton';

export const OrderHistoryItemSkeleton = () => (
  <div className="mb-4 w-full rounded-[6px] bg-white-base p-4 shadow-base">
    {/* 注文情報ヘッダー */}
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Skeleton className="h-5 w-32 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 " />
        <Skeleton className="h-5 w-40 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>
      <Skeleton className="h-8 w-32 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    </div>

    {/* 商品情報 */}
    <div className="flex gap-4">
      {/* 商品画像 */}
      <div className="h-24 w-24 flex-shrink-0">
        <Skeleton className="h-full w-full animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>

      <div className="flex flex-1 flex-col">
        {/* 商品名と価格 */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-full animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            <Skeleton className="h-5 w-2/3 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            <Skeleton className="h-5 w-16 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          </div>
        </div>

        {/* ボタン類 */}
        <div className="mt-4 flex items-center justify-end gap-2">
          <Skeleton className="h-10 w-32 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          <Skeleton className="h-10 w-32 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
      </div>
    </div>
  </div>
);
