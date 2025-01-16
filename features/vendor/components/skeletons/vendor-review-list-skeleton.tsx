import { Skeleton } from '@/components/ui/skeleton';
import { ReviewListWithAvatorSkeleton } from '@/features/review/components/skeletons/review-list-with-avator-skeleton';

export const VendorReviewListSkeleton = () => (
  <>
    <ReviewListWithAvatorSkeleton />
    {/* ページネーション */}
    <div className="mt-8 flex justify-center">
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-10 rounded-lg" />
        ))}
      </div>
    </div>
  </>
);
