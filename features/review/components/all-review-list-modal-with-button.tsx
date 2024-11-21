'use client';

import { useRef } from 'react';
import { Review } from '../types';
import { AllReviewListModal, AllReviewListModalRef } from './all-review-list-modal';
import { SeeMoreReviewButton } from './see-more-review-button';

type Props = {
  reviews: Review[];
  reviewsCount: number;
};

export function AllReviewListModalWithButton({ reviews, reviewsCount }: Props) {
  const allReviewListModalRef = useRef<AllReviewListModalRef>(null);

  const handleSeeMoreClick = () => {
    allReviewListModalRef.current?.open();
  };

  const existsReviews = reviewsCount > 1;

  return (
    existsReviews && (
      <>
        <div className="mx-auto">
          <SeeMoreReviewButton onClick={handleSeeMoreClick} />
        </div>
        <AllReviewListModal
          ref={allReviewListModalRef}
          reviews={reviews}
          reviewsCount={reviewsCount}
        />
      </>
    )
  );
}
