import { Typography } from '@/components/ui/typography';
import { formatDateString } from '@/utils/date';
import { CornerDownRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReviewCommentWithUser } from '../types';
import { FeedbackButton } from './feedback-button';

type ReviewCommentListItemProps = {
  comment: ReviewCommentWithUser;
  isFeedbackActive: boolean;
  onFeedbackToggle: (isActive: boolean) => void;
  feedbackCount: number;
};

export function ReviewCommentListItem({
  comment,
  isFeedbackActive,
  onFeedbackToggle,
  feedbackCount
}: ReviewCommentListItemProps) {
  return (
    <div className="flex items-start space-x-3 pl-4">
      <CornerDownRight className="h-[16px] w-[16px] text-black-90" />
      <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-gray-200">
        <Link href={`/user-detail/${comment.user?.attributes.unique_key}`}>
          <Image
            src={comment.user?.avatar?.url || '/placeholder-product-image.png'}
            alt={comment.user?.attributes?.nickname ?? '匿名'}
            width={32}
            height={32}
            className="h-[32px] w-[32px] rounded-full object-cover"
          />
        </Link>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <Typography as="boldSmall" element="p" className="text-charcoalGray">
            {comment.user?.attributes?.nickname ?? '匿名'}
          </Typography>
          <Typography as="small" element="p" className="text-charcoalGray">
            •
          </Typography>
          <Typography as="small" element="p" className="font-normal text-charcoalGray">
            {formatDateString(comment.attributes?.created_at)}
          </Typography>
        </div>
        <Typography
          as="body"
          element="p"
          className="mt-1 max-w-[720px] whitespace-normal break-words text-[14px] text-black-90"
        >
          {comment.attributes?.content}
        </Typography>
        {comment.attributes?.images && (
          <div className="flex items-center gap-2">
            {comment.attributes.images.map((image) => (
              <Image
                key={image}
                src={image}
                alt="コメント画像"
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
            ))}
          </div>
        )}
        <FeedbackButton
          isActive={isFeedbackActive}
          onClick={() => onFeedbackToggle(isFeedbackActive)}
          className="mt-2"
          feedbackCount={feedbackCount}
        />
      </div>
    </div>
  );
}
