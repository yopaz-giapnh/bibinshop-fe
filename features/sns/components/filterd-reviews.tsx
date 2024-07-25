'use client';

import { Typography } from '@/components/ui/typography';
import ProfileReviewEmptyView from '@/features/account/profile/components/profile-review-empty-view';
import { ProfileReviewItem } from '@/features/account/profile/components/profile-review-item';
import { Review } from '@/features/review/types';
import { useState } from 'react';
import { ReviewFilters } from './review-filters';

type FilteredReviewsProps = {
  reviews: Review[];
};

export function FilteredReviews({ reviews }: FilteredReviewsProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredReviews = reviews.filter((review) => {
    if (selectedFilter === 'all') return true;
    return review?.attributes?.rating?.toString() === selectedFilter;
  });

  const reviewsEmpty = filteredReviews.length === 0;

  return (
    <>
      <ReviewFilters selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
      {reviewsEmpty ? (
        <ProfileReviewEmptyView />
      ) : (
        <div className="rounded-[6px] bg-white-base p-[16px] md:p-[24px]">
          <Typography as="bold" element="p" className="mb-[16px] text-[20px] text-black-90">
            レビュー
          </Typography>
          {filteredReviews.map((review, index) => (
            <div key={review.id}>
              <ProfileReviewItem review={review} />
              {index < filteredReviews.length - 1 && (
                <div className="my-[16px] h-[1px] w-full bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
