import { Skeleton } from '@/components/ui/skeleton';

export const OrderDetailSkeleton = () => {
  return (
    <div className="mt-8 w-full max-w-[392px]">
      {/* 注文商品 */}
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-4">
            {/* 商品画像 */}
            <Skeleton className="h-24 w-24 rounded-lg" />

            {/* 商品情報 */}
            <div className="flex flex-1 flex-col justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" /> {/* 商品名 */}
                <Skeleton className="h-4 w-24" /> {/* 価格 */}
              </div>
              <Skeleton className="h-4 w-16" /> {/* 数量 */}
            </div>
          </div>
        ))}
      </div>

      {/* 注文情報 */}
      <div className="mt-8 space-y-4">
        {/* 配送先 */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" /> {/* セクションタイトル */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        {/* 支払い方法 */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" /> {/* セクションタイトル */}
          <Skeleton className="h-4 w-48" />
        </div>

        {/* 注文金額 */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" /> {/* セクションタイトル */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
