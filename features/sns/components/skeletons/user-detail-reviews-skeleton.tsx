import { Skeleton } from '@/components/ui/skeleton';
import { ReviewListWithAvatorSkeleton } from '@/features/review/components/skeletons/review-list-with-avator-skeleton';

export const UserDetailReviewsSkeleton = () => {
  return (
    <div className="flex w-full flex-col">
      {/* レビューリスト */}
      <ReviewListWithAvatorSkeleton />
      {/* ページネーション */}
      <div className="mt-8 flex justify-center gap-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded-full" />
        ))}
      </div>
    </div>
  );
};
