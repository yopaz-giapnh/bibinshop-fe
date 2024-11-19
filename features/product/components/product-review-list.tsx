'use client';

import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { getReviews } from '@/features/review/actions';
import {
  AllReviewListModal,
  AllReviewListModalRef
} from '@/features/review/components/all-review-list-modal';
import { ReviewListWithAvator } from '@/features/review/components/review-list-with-avator';
import { SeeMoreReviewButton } from '@/features/review/components/see-more-review-button';
import { Review } from '@/features/review/types';
import { useEffect, useRef, useState } from 'react';

type Props = {
  productId: string;
};

export function ProductReviewList({ productId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsCount, setReviewsCount] = useState(0);
  const allReviewListModalRef = useRef<AllReviewListModalRef>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setIsLoading(true);
        const fetchedReviews = await getReviews({
          query: {
            'filter[product_ids]': productId
          }
        });
        setReviews(fetchedReviews.data);
        setReviewsCount(fetchedReviews?.meta?.total_count ?? 0);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReviews();
  }, [productId]);

  const displayedReviews = reviews.slice(0, 3);

  const handleSeeMoreClick = () => {
    allReviewListModalRef.current?.open();
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center py-4">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <ReviewListWithAvator reviews={displayedReviews} />
          {reviewsCount > 3 && (
            <div className="mx-auto">
              <SeeMoreReviewButton onClick={handleSeeMoreClick} />
            </div>
          )}
          <AllReviewListModal
            ref={allReviewListModalRef}
            reviews={reviews}
            reviewsCount={reviewsCount}
          />
        </>
      )}
    </>
  );
}
