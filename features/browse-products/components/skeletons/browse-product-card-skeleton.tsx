import { Skeleton } from '@/components/ui/skeleton';

export const BrowseProductCardSkeleton = () => (
  <div className="relative flex flex-col bg-white-base">
    {/* 商品画像 */}
    <div className="relative pb-[100%]">
      <Skeleton className="absolute h-full w-full bg-gray-200" />
    </div>

    {/* 商品情報 */}
    <div className="p-2">
      <div className="flex flex-col gap-2">
        {/* 商品名 */}
        <div className="flex flex-col gap-1">
          <Skeleton className="h-5 w-full bg-gray-200" />
          <Skeleton className="h-5 w-2/3 bg-gray-200" />
        </div>

        {/* 価格と送料情報 */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-24 bg-gray-200" />
          <div className="border-primary-main flex items-center rounded-full border border-solid px-2 py-0.5">
            <Skeleton className="h-4 w-20 bg-gray-200" />
          </div>
        </div>

        {/* レビュー情報と販売数 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex gap-[1px]">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-4 w-4 bg-gray-200" />
              ))}
            </div>
            <Skeleton className="h-4 w-8 bg-gray-200" />
          </div>
          <div className="flex items-center gap-0.5">
            <Skeleton className="h-5 w-8 bg-gray-200" />
            <Skeleton className="h-5 w-12 bg-gray-200" />
          </div>
        </div>

        {/* カートボタン */}
        <div className="flex justify-end">
          <Skeleton className="h-8 w-8 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>

    {/* 削除ボタン */}
    <div className="absolute right-2 top-2 z-10">
      <Skeleton className="h-8 w-8 rounded-full bg-gray-200 shadow-md md:h-16 md:w-16" />
    </div>
  </div>
);
