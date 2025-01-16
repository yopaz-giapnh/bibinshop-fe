import { Skeleton } from '@/components/ui/skeleton';
import { VendorReviewListSkeleton } from './vendor-review-list-skeleton';

export const VendorReviewsSkeleton = () => (
  <div className="flex w-full flex-col justify-between">
    <div className="flex w-full flex-col md:flex-row">
      {/* 評価統計情報 */}
      <div className="flex flex-col items-center md:items-start">
        {/* 平均評価 */}
        <div className="z-0 w-full md:w-[225px]">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
        {/* 評価分布 */}
        <div className="w-full">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="mt-2 flex w-full items-center">
              <Skeleton className="mr-2 h-2 w-2/3 md:w-[100px]" />
              <Skeleton className="h-6 w-28" />
            </div>
          ))}
        </div>
      </div>
      {/* レビューリスト */}
      <div className="mt-8 md:ml-20 md:mt-0">
        <VendorReviewListSkeleton />
      </div>
    </div>
  </div>
);
