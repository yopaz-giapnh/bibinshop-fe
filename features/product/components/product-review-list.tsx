import { getReviews } from '@/features/review/actions';
import { ReviewListWithAvator } from '@/features/review/components/review-list-with-avator';
import { SeeMoreReviewButton } from '@/features/review/components/see-more-review-button';

type Props = {
  productId: string;
};

export async function ProductReviewList({ productId }: Props) {
  const reviews = await getReviews({
    query: {
      'filter[product_ids]': productId
    }
  });
  const reviewsCount = reviews?.meta?.total_count ?? 0;

  return (
    <>
      <ReviewListWithAvator reviews={reviews.data} />
      {reviewsCount > 3 && (
        <div className="mx-auto">
          <SeeMoreReviewButton href="/reviews" />
        </div>
      )}
    </>
  );
}
