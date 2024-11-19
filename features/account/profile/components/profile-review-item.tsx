'use client';

import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { getProductImageUrl } from '@/features/product/utils';
import { addReviewFeedback, removeReviewFeedback } from '@/features/review/actions';
import { FeedbackButton } from '@/features/review/components/feedback-button';
import Rating from '@/features/review/components/rating';
import { ReplyButton } from '@/features/review/components/reply-button';
import {
  ReviewCommentReplyModal,
  ReviewCommentReplyModalRef
} from '@/features/review/components/review-comment-reply-modal';
import { useFeedback } from '@/features/review/contexts/feedback-context';
import { Review } from '@/features/review/types';
import { formatDateString } from '@/utils/date';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

type ReviewProps = {
  review: Review;
};

export function ProfileReviewItem({ review }: ReviewProps) {
  const { toast } = useToast();
  const reviewCommentReplyModalRef = useRef<ReviewCommentReplyModalRef>(null);
  const {
    feedbackStates,
    feedbackCounts,
    initializeFeedback,
    updateFeedbackState,
    updateFeedbackCount
  } = useFeedback();

  const handleFeedbackToggle = async () => {
    if (!review) return;

    const currentState = feedbackStates[review.id] || false;
    const currentCount = feedbackCounts[review.id] || review.attributes.feedback_reviews_count || 0;

    try {
      if (currentState) {
        const feedbackId = review.attributes.feedback_id;
        if (feedbackId) {
          const result = await removeReviewFeedback({ review_id: review.id, id: feedbackId });
          if (result.success) {
            review.attributes.feedback_id = undefined;
            updateFeedbackState(review.id, false);
            updateFeedbackCount(review.id, Math.max(0, currentCount - 1));
            toast({ title: result.message });
          }
        }
      } else {
        const result = await addReviewFeedback({ review_id: review.id });
        if (result.success && result.data?.id) {
          review.attributes.feedback_id = result.data.id;
          updateFeedbackState(review.id, true);
          updateFeedbackCount(review.id, currentCount + 1);
          toast({ title: result.message });
        }
      }
    } catch (error) {
      console.error('Error toggling feedback:', error);
    }
  };

  useEffect(() => {
    if (review) {
      initializeFeedback(review);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [review]);

  return (
    <div>
      <div className="flex items-baseline">
        <Rating star={review.attributes.rating || 0} readOnly />
        <Typography as="xSmall" element="p" className="text-[14px] text-gray-400">
          ・{formatDateString(review.attributes.created_at)}
        </Typography>
      </div>
      {/* TODO: プロパティ設定 */}
      {/* <Typography as="bold" element="p" className="mt-[8px] text-[14px] text-black-90">
        色： TODO: プロパティ
      </Typography> */}
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
        <ReplyButton
          review={review}
          onClick={() => reviewCommentReplyModalRef.current?.open(review)}
        />
        <FeedbackButton
          isActive={feedbackStates[review.id] || false}
          onClick={handleFeedbackToggle}
          className="flex items-center space-x-2"
          feedbackCount={feedbackCounts[review.id] || 0}
        />
      </div>
      <ReviewCommentReplyModal ref={reviewCommentReplyModalRef} />
    </div>
  );
}
