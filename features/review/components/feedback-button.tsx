import { Typography } from '@/components/ui/typography';
import { ThumbsUp } from 'lucide-react';

type FeedbackButtonProps = {
  isActive: boolean;
  onClick: () => void;
  className?: string;
  feedbackCount?: number;
};

export function FeedbackButton({
  isActive,
  onClick,
  className = '',
  feedbackCount
}: FeedbackButtonProps) {
  return (
    <button
      className={`flex items-center space-x-2 rounded-[20px] border px-4 py-1 ${className}`}
      onClick={onClick}
    >
      <ThumbsUp
        className={`h-[16px] w-[16px] ${isActive ? 'text-bibinBlue-100' : 'text-black-90'}`}
      />
      <Typography
        as="caption"
        element="p"
        className={`text-[14px] ${isActive ? 'text-bibinBlue-100' : 'text-black-90'}`}
      >
        参考になった
      </Typography>
      <Typography
        as="caption"
        element="p"
        className={`text-[14px] ${isActive ? 'text-bibinBlue-100' : 'text-black-90'}`}
      >
        {feedbackCount && feedbackCount > 0 ? `(${feedbackCount})` : ''}
      </Typography>
    </button>
  );
}
