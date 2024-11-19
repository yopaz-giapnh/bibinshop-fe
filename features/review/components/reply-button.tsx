import { Typography } from '@/components/ui/typography';
import { MessageCircleReply } from 'lucide-react';
import { Review } from '../types';

type Props = {
  review: Review;
  onClick: (review: Review) => void;
};

export function ReplyButton({ review, onClick }: Props) {
  return (
    <button
      className="mr-4 flex items-center rounded-[20px] border px-4 py-1"
      onClick={() => onClick(review)}
    >
      <MessageCircleReply className="mr-2 h-[16px] w-[16px] text-black-90" />
      <Typography as="caption" element="p" className="text-black-90">
        返信
      </Typography>
      <Typography as="caption" element="p" className="text-black-90">
        {review.attributes.review_comments_count && review.attributes.review_comments_count > 0
          ? `(${review.attributes.review_comments_count})`
          : ''}
      </Typography>
    </button>
  );
}
