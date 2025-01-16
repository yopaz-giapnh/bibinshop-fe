import { ReviewListWithAvatorSkeleton } from '@/features/review/components/skeletons/review-list-with-avator-skeleton';

export const ProductReviewListSkeleton = () => {
  return (
    <div className="flex w-full flex-col">
      {/* レビューリスト */}
      <ReviewListWithAvatorSkeleton />
    </div>
  );
};
