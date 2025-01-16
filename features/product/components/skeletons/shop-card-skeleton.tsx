import { Skeleton } from '@/components/ui/skeleton';

export const ShopCardSkeleton = () => {
  return (
    <div className="mt-4 rounded-lg border p-4">
      {/* ショップ名 */}
      <div className="flex gap-2">
        <Skeleton className="h-24 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        {/* Store icon */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-40 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          {/* Shop name */}
          <Skeleton className="h-5 w-40 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          {/* Shipping details */}
          <Skeleton className="flex h-5 w-40 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 md:hidden" />
          {/* Review stars */}
          <Skeleton className="hidden h-9 w-full animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 md:flex" />
        </div>
      </div>

      {/* 全ての商品を見るボタン */}
      <Skeleton className="mt-2 flex h-9 w-full animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 md:hidden" />
    </div>
  );
};
