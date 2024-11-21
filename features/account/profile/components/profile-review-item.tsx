'use client';

import { Typography } from '@/components/ui/typography';
import { getProductImageUrl } from '@/features/product/utils';
import { FeedbackButton } from '@/features/review/components/feedback-button';
import Rating from '@/features/review/components/rating';
import { ReplyButton } from '@/features/review/components/reply-button';
import {
  ReviewCommentReplyModal,
  ReviewCommentReplyModalRef
} from '@/features/review/components/review-comment-reply-modal';
import { Review } from '@/features/review/types';
import { useReviewFeedback } from '@/features/review/utils';
import {
  NewRegistrationMediationModal,
  NewRegistrationMediationModalRef
} from '@/features/sns/components/new-registration-mediation-modal';
import { useAuth } from '@/hooks/use-auth';
import { formatDateString } from '@/utils/date';
import Image from 'next/image';
import { useRef, useState } from 'react';

type ReviewProps = {
  review: Review;
};

export function ProfileReviewItem({ review: initialReview }: ReviewProps) {
  const { isLoggedIn } = useAuth();
  const newRegistrationMediationModalRef = useRef<NewRegistrationMediationModalRef>(null);
  const reviewCommentReplyModalRef = useRef<ReviewCommentReplyModalRef>(null);
  const { handleFeedbackToggle } = useReviewFeedback();
  const [review, setReview] = useState(initialReview);

  const handleReplyClick = (review: Review) => {
    if (!isLoggedIn) {
      newRegistrationMediationModalRef.current?.open();
      return;
    }
    reviewCommentReplyModalRef.current?.open(review);
  };

  const handleFeedbackClick = () => {
    if (!isLoggedIn) {
      newRegistrationMediationModalRef.current?.open();
      return;
    }
    handleFeedbackToggle(review, (updatedReview) => {
      setReview(updatedReview);
    });
  };

  return (
    <div>
      <div className="flex items-baseline">
        <Rating star={review.attributes.rating || 0} readOnly />
        <Typography as="xSmall" element="p" className="text-[14px] text-gray-400">
          ・{formatDateString(review.attributes.created_at)}
        </Typography>
      </div>
      <Typography
        as="xSmall"
        element="p"
        className="mt-[16px] text-[14px] text-black-90 md:text-[16px]"
      >
        {review.attributes.review}
      </Typography>
      <div className="mt-[8px] flex items-center rounded-[4px] bg-paleFrostBlue p-[16px] md:mt-[32px]">
        <div className="relative h-[59px] w-[59px] md:h-[100px] md:w-[100px]">
          <Image
            src={getProductImageUrl(review.images[0])}
            fill
            alt={''}
            className="rounded-[2px]"
          />
        </div>
        <div className="pl-[16px]">
          <Typography
            as="bold"
            element="p"
            className="max-w-[200px] overflow-hidden whitespace-normal break-words text-[14px] text-black-90 md:max-w-[calc(60vw-100px)] md:text-[16px]"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2
            }}
          >
            {review.product?.attributes.name}
          </Typography>
          <Typography as="bold" element="p" className="mt-[10px] text-[14px] text-bibinBlue-100">
            {review.product?.attributes.display_price}
          </Typography>
        </div>
      </div>
      <div className="mt-[16px] flex justify-start">
        <ReplyButton review={review} onClick={handleReplyClick} />
        <FeedbackButton
          isActive={!!review.attributes.feedback_id}
          onClick={handleFeedbackClick}
          className="flex items-center space-x-2"
          feedbackCount={review.attributes.feedback_reviews_count || 0}
        />
      </div>
      <ReviewCommentReplyModal
        ref={reviewCommentReplyModalRef}
        onReviewUpdate={(updatedReview) => {
          setReview(updatedReview);
        }}
      />
      <NewRegistrationMediationModal ref={newRegistrationMediationModalRef} />
    </div>
  );
}
