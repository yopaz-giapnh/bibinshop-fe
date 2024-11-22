import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { getReviews } from '@/features/review/actions';
import { AllReviewListModalWithButton } from '@/features/review/components/all-review-list-modal-with-button';
import { ReviewListWithAvator } from '@/features/review/components/review-list-with-avator';
import { Suspense } from 'react';

type Props = {
  productId: string;
};

export async function ProductReviewList({ productId }: Props) {
  const { data: reviews, meta } = await getReviews({
    query: {
      'filter[product_ids]': productId
    }
  });
  const displayedReviews = reviews.slice(0, 3);
  const reviewsCount = meta?.total_count ?? 0;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ReviewListWithAvator reviews={displayedReviews} />
        {reviewsCount >= 3 && (
          <AllReviewListModalWithButton reviews={reviews} reviewsCount={reviewsCount} />
        )}
      </Suspense>
    </>
  );
}

function Loading() {
  return (
    <div className="flex justify-center py-4">
      <LoadingSpinner />
    </div>
  );
}
