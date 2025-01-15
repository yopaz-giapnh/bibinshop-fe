import { Skeleton } from '@/components/ui/skeleton';

export const CheckoutCartFormSkeleton = () => (
  <div className="flex flex-col gap-4">
    {/* セクションタイトル */}
    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-32 bg-gray-200" />
      <Skeleton className="h-5 w-24 bg-gray-200" />
    </div>

    {/* カートアイテム */}
    <div className="flex flex-col gap-4">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="flex gap-4">
          {/* 商品画像 */}
          <Skeleton className="h-16 w-16 shrink-0 rounded-md bg-gray-200" />

          <div className="flex flex-1 flex-col gap-2">
            {/* ショップ名 */}
            <Skeleton className="h-4 w-32 bg-gray-200" />

            {/* 商品名と価格 */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-48 bg-gray-200" />
              <div className="flex items-center gap-1">
                <Skeleton className="h-4 w-16 bg-gray-200" />
                <Skeleton className="h-4 w-4 bg-gray-200" />
              </div>
            </div>

            {/* 数量 */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-8 bg-gray-200" />
              <Skeleton className="h-4 w-4 bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
