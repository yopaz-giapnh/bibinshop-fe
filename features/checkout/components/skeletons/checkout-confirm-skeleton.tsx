import { Skeleton } from '@/components/ui/skeleton';

export const CheckoutConfirmSkeleton = () => (
  <div className="flex w-full flex-col items-center">
    <div className="w-full overflow-y-auto px-2 md:px-[272px]">
      {/* 注文概要 */}
      <div className="mb-4 mt-8 rounded-md bg-white-base p-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-32 bg-gray-200" />
          <Skeleton className="h-4 w-24 bg-gray-200" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20 bg-gray-200" />
            <Skeleton className="h-4 w-24 bg-gray-200" />
          </div>
        </div>
      </div>

      {/* 支払い方法 */}
      <div className="mb-4 rounded-md bg-white-base p-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-32 bg-gray-200" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-sm bg-gray-200" />
            <Skeleton className="h-4 w-24 bg-gray-200" />
          </div>
        </div>
      </div>

      {/* 配送先住所 */}
      <div className="mb-4 rounded-md bg-white-base p-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-32 bg-gray-200" />
          <Skeleton className="h-4 w-40 bg-gray-200" />
          <Skeleton className="h-4 w-32 bg-gray-200" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-48 bg-gray-200" />
            <Skeleton className="h-4 w-64 bg-gray-200" />
            <Skeleton className="h-4 w-48 bg-gray-200" />
          </div>
        </div>
      </div>

      {/* 注文内容 */}
      <div className="mb-4 rounded-md bg-white-base p-4">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-32 bg-gray-200" />
          {/* 商品アイテム */}
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex gap-4">
              <Skeleton className="h-24 w-24 rounded-md bg-gray-200" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-48 bg-gray-200" />
                <Skeleton className="h-4 w-32 bg-gray-200" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20 bg-gray-200" />
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
