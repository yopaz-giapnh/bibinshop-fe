'use client';

import { getReviews } from '@/features/review/actions';
import { ReviewListWithAvator } from '@/features/review/components/review-list-with-avator';
import { SeeMoreReviewButton } from '@/features/review/components/see-more-review-button';
import { Review } from '@/features/review/types';
import { useEffect, useState } from 'react';

type Props = {
  productId: string;
};

export function ProductReviewList({ productId }: Props) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
    async function fetchReviews() {
      const fetchedReviews = await getReviews({
        query: {
          'filter[product_ids]': productId
        }
      });
      setReviews(fetchedReviews.data);
      setReviewsCount(fetchedReviews?.meta?.total_count ?? 0);
    }
    fetchReviews();
  }, [productId]);

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const handleSeeMoreClick = () => {
    setShowAllReviews(true);
  };

  return (
    <>
      <ReviewListWithAvator reviews={displayedReviews} />
      {reviewsCount > 3 && !showAllReviews && (
        <div className="mx-auto">
          <SeeMoreReviewButton onClick={handleSeeMoreClick} />
        </div>
      )}
    </>
  );
}
