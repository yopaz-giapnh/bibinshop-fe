import { Skeleton } from '@/components/ui/skeleton';

export const ProductOverviewSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* 商品グリッド */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            {/* 商品画像 */}
            <Skeleton className="aspect-square w-full animate-[pulse_1s_ease-in-out_infinite] rounded-lg bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

            {/* 商品情報 */}
            <div className="space-y-2">
              {/* 商品名 */}
              <Skeleton className="h-4 w-full animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
              {/* 価格 */}
              <Skeleton className="h-4 w-2/3 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
