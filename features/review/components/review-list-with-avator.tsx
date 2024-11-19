'use client';

import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { formatDateString } from '@/utils/date';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { addReviewFeedback, removeReviewFeedback } from '../actions';
import { useFeedback } from '../contexts/feedback-context';
import { Review } from '../types';
import { FeedbackButton } from './feedback-button';
import Rating from './rating';
import { ReplyButton } from './reply-button';
import { ReviewCommentReplyModal, ReviewCommentReplyModalRef } from './review-comment-reply-modal';

type Props = {
  reviews: Review[];
};

export function ReviewListWithAvator({ reviews }: Props) {
  const reviewCommentReplyModalRef = useRef<ReviewCommentReplyModalRef>(null);
  const { toast } = useToast();
  const {
    feedbackStates,
    feedbackCounts,
    initializeFeedbacks,
    updateFeedbackState,
    updateFeedbackCount
  } = useFeedback();

  const handleFeedbackToggle = async (review?: Review) => {
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
    if (reviews.length > 0 && !Object.keys(feedbackStates).length) {
      initializeFeedbacks(reviews);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews]);

  return (
    <div className="flex flex-col px-4 md:px-0">
      <div className="mt-4 flex flex-col gap-6">
        {reviews.map((review) => {
          const avatarUrl = review.avatar
            ? review.avatar.attributes?.styles?.[review.avatar.attributes.styles.length - 1]?.url
            : undefined;
          return (
            <div key={review.id} className="flex w-full">
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[20px]">
                <Image
                  src={avatarUrl || '/placeholder-product-image.png'}
                  alt={review.user?.attributes.nickname ?? '匿名'}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="ml-3 md:ml-6">
                <div className="flex items-center gap-2">
                  <Typography
                    as="boldSmall"
                    element="p"
                    className="max-w-[30px] overflow-hidden whitespace-normal break-words text-charcoalGray md:max-w-none"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 1
                    }}
                  >
                    {review.user?.attributes.nickname ?? '匿名'}
                  </Typography>
                  <Typography as="small" element="p" className="text-charcoalGray">
                    •
                  </Typography>
                  <Typography as="small" element="p" className="font-normal text-charcoalGray">
                    {formatDateString(review.attributes.created_at)}
                  </Typography>
                  <Typography as="small" element="p" className="text-charcoalGray">
                    •
                  </Typography>
                  <Rating star={review.attributes.rating ?? 0} readOnly />
                </div>
                {/* TODO: api が実装されてから */}
                {/* <Typography as="small" element="p" className="text-black-100 mt-2">
                色: バーガンディ
              </Typography> */}
                <Typography
                  as="body"
                  element="p"
                  className="text-black-100 mt-4 max-w-[285px] font-normal md:max-w-[42vw]"
                >
                  {review.attributes.review}
                </Typography>
                <div className="mt-[16px] flex">
                  <ReplyButton
                    review={review}
                    onClick={() => reviewCommentReplyModalRef.current?.open(review)}
                  />
                  <FeedbackButton
                    isActive={feedbackStates[review.id] || false}
                    onClick={() => handleFeedbackToggle(review)}
                    feedbackCount={feedbackCounts[review.id] || 0}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ReviewCommentReplyModal ref={reviewCommentReplyModalRef} />
    </div>
  );
}
