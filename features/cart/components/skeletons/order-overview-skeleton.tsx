import { Skeleton } from '@/components/ui/skeleton';

export const OrderOverviewSkeleton = () => (
  <div className="bg-white rounded-md p-4 shadow-sm">
    {/* タイトル */}
    <div className="mb-4">
      <Skeleton className="h-5 w-20 bg-gray-200" />
    </div>

    {/* 商品金額 */}
    <div className="mb-2 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <Skeleton className="h-4 w-16 bg-gray-200" />
        <Skeleton className="h-4 w-6 bg-gray-200" />
      </div>
      <div className="flex items-center gap-1">
        <Skeleton className="h-4 w-16 bg-gray-200" />
        <Skeleton className="h-4 w-4 bg-gray-200" />
      </div>
    </div>

    {/* 送料 */}
    <div className="mb-2 flex items-center justify-between">
      <Skeleton className="h-4 w-8 bg-gray-200" />
      <div className="flex items-center gap-1">
        <Skeleton className="h-4 w-16 bg-gray-200" />
        <Skeleton className="h-4 w-4 bg-gray-200" />
      </div>
    </div>

    {/* クーポン割引 */}
    <div className="mb-4 flex items-center justify-between">
      <Skeleton className="h-4 w-20 bg-gray-200" />
      <div className="flex items-center gap-1">
        <Skeleton className="h-4 w-16 bg-gray-200" />
        <Skeleton className="h-4 w-4 bg-gray-200" />
      </div>
    </div>

    {/* 合計 */}
    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
      <Skeleton className="h-5 w-8 bg-gray-200" />
      <div className="flex items-center gap-1">
        <Skeleton className="h-5 w-20 bg-gray-200" />
        <Skeleton className="h-5 w-4 bg-gray-200" />
      </div>
    </div>

    {/* 次へ進むボタン */}
    <div className="mt-4">
      <div className="h-12 w-full rounded-md bg-gradient-to-r from-blue-400 to-green-400" />
    </div>
  </div>
);
