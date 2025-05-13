'use client';

import { Typography } from '@/components/ui/typography';
import { formatDateString } from '@/utils/date';

// import {
//   NewRegistrationMediationModal,
//   NewRegistrationMediationModalRef
// } from '@/features/sns/components/new-registration-mediation-modal';
import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Review } from '../types';
import { useReviewFeedback } from '../utils';
import { FeedbackButton } from './feedback-button';
import Rating from './rating';
import { ReplyButton } from './reply-button';
import { ReviewCommentReplyModal, ReviewCommentReplyModalRef } from './review-comment-reply-modal';

type Props = {
  reviews: Review[];
};

export function ReviewListWithAvator({ reviews }: Props) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  // TODO: 初回登録クーポン関連の表示をリリース時には表示させないようにする
  // const newRegistrationMediationModalRef = useRef<NewRegistrationMediationModalRef>(null);
  const reviewCommentReplyModalRef = useRef<ReviewCommentReplyModalRef>(null);
  const { handleFeedbackToggle } = useReviewFeedback();
  const [reviewList, setReviewList] = useState(reviews);

  const handleReplyClick = (review: Review) => {
    if (!isLoggedIn) {
      // newRegistrationMediationModalRef.current?.open();
      router.push('/signup');
      return;
    }
    reviewCommentReplyModalRef.current?.open(review);
  };

  const handleFeedbackClick = (review: Review) => {
    if (!isLoggedIn) {
      // newRegistrationMediationModalRef.current?.open();
      router.push('/signup');
      return;
    }
    handleFeedbackToggle(review, (updatedReview) => {
      setReviewList((prevReviews) =>
        prevReviews.map((r) => (r.id === updatedReview.id ? updatedReview : r))
      );
    });
  };

  return (
    <div className="flex flex-col px-4 md:px-0">
      <div className="mt-4 flex flex-col gap-6">
        {reviewList.map((review) => {
          const userUniqueKey = review.user?.attributes.unique_key;
          const avatarUrl = review.avatar
            ? review.avatar.attributes?.styles?.[review.avatar.attributes.styles.length - 1]?.url
            : undefined;
          return (
            <div key={review.id} className="flex w-full">
              <Link
                href={`/user-detail/${userUniqueKey}`}
                className="flex h-[40px] w-[40px] items-center justify-center rounded-[20px]"
              >
                <Image
                  src={avatarUrl || '/placeholder-product-image.png'}
                  alt={review.user?.attributes.nickname ?? '匿名'}
                  width={40}
                  height={40}
                  className="h-[40px] w-[40px] rounded-full object-cover"
                />
              </Link>
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
                {/* レビュー画像がある場合のみ表示 */}
                {review.attributes.images && review.attributes.images.length > 0 && (
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {review.attributes.images.map((image, index) => (
                      <div key={index} className="relative aspect-square">
                        <Image
                          src={image.url || ''}
                          alt={`レビュー画像 ${index + 1}`}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-[16px] flex">
                  <ReplyButton review={review} onClick={handleReplyClick} />
                  <FeedbackButton
                    isActive={!!review.attributes.feedback_id}
                    onClick={() => handleFeedbackClick(review)}
                    feedbackCount={review.attributes.feedback_reviews_count || 0}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ReviewCommentReplyModal
        ref={reviewCommentReplyModalRef}
        onReviewUpdate={(updatedReview) => {
          setReviewList((prevReviews) =>
            prevReviews.map((r) => (r.id === updatedReview.id ? updatedReview : r))
          );
        }}
      />
      {/*<NewRegistrationMediationModal ref={newRegistrationMediationModalRef} />*/}
    </div>
  );
}
