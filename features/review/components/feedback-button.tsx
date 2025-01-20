import { Typography } from '@/components/ui/typography';
import { motion } from 'framer-motion';
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
    <motion.button
      className={`flex items-center space-x-2 rounded-[20px] border px-4 py-1 ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        whileTap={{ scale: 0.8 }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 15, -15, 0]
        }}
        key={isActive ? 'active' : 'inactive'}
        transition={{
          duration: 0.4,
          ease: 'easeInOut'
        }}
      >
        <ThumbsUp
          className={`h-[16px] w-[16px] ${isActive ? 'text-bibinBlue-100' : 'text-black-90'}`}
        />
      </motion.div>
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
    </motion.button>
  );
}
