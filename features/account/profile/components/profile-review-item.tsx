'use client';

import { Typography } from '@/components/ui/typography';
import { getProductImageUrl } from '@/features/product/utils';
import { addReviewFeedback, removeReviewFeedback } from '@/features/review/actions';
import Rating from '@/features/review/components/rating';
import { Review } from '@/features/review/types';
import { formatDateString } from '@/utils/date';
import { ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getAccount } from '../actions';
import { User } from '../types';

type ReviewProps = {
  review: Review;
};

export function ProfileReviewItem({ review }: ReviewProps) {
  const [isFeedback, setIsFeedback] = useState(!!review.attributes.feedback_id);
  const [account, setAccount] = useState<User | null>(null);
  const isCurrentUser = account?.id === review?.relationships?.user?.data?.id;

  useEffect(() => {
    async function fetchAccount() {
      try {
        const accountData = await getAccount();
        setAccount(accountData);
      } catch (error) {
        console.error('Error fetching account:', error);
      }
    }

    fetchAccount();
  }, []);

  const handleFeedbackToggle = async () => {
    try {
      if (isFeedback) {
        const feedbackId = review.attributes.feedback_id;
        if (feedbackId) {
          await removeReviewFeedback({ review_id: review.id, id: feedbackId });
          setIsFeedback(false);
        } else {
          return;
        }
      } else {
        await addReviewFeedback({ review_id: review.id });
        setIsFeedback(true);
      }
    } catch (error) {
      console.error('Error toggling feedback:', error);
    }
  };

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
      {!isCurrentUser && (
        <div className="mt-[16px] flex justify-end">
          <button className="flex items-center space-x-2" onClick={handleFeedbackToggle}>
            <ThumbsUp
              className={`h-[16px] w-[16px] ${isFeedback ? 'text-bibinBlue-100' : 'text-black-90'}`}
            />
            <Typography
              as="caption"
              element="p"
              className={`text-[14px] ${isFeedback ? 'text-bibinBlue-100' : 'text-black-90'}`}
            >
              参考になった
            </Typography>
          </button>
        </div>
      )}
    </div>
  );
}
