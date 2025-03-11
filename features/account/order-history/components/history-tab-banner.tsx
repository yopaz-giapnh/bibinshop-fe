'use client';

import { Typography } from '@/components/ui/typography';
import CarbonReview from '@/assets/order/carbon-review.svg';
import DollarCircleFill from '@/assets/order/dollar-circle-fill.svg';
import CarbonReviewSp from '@/assets/order/carbon-review-sp.svg';
import DollarCircleFillSp from '@/assets/order/dollar-circle-fill-sp.svg';
import { cn } from '@/lib/utils';
import { useIsPc } from '@/hooks/use-is-pc';

type Props = {
  title: string;
  content: string;
  className?: string;
};

export const HistoryTabBanner: React.FC<Props> = ({ title, content, className }) => {
  const isPc = useIsPc();

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between rounded-md border-b border-gray-200 bg-blueGradient px-2 py-1 md:px-12',
        className
      )}
    >
      {isPc ? <CarbonReview /> : <CarbonReviewSp />}
      <div className="flex flex-row">
        <Typography
          as="boldXLarge"
          element="p"
          className="text-[16px] text-white-base md:text-[20px]"
        >
          {title}
        </Typography>
        <Typography
          as="boldXLarge"
          element="p"
          className="text-[16px] text-bibinYellow-100 md:text-[20px]"
        >
          {content}
        </Typography>
      </div>
      {isPc ? <DollarCircleFill /> : <DollarCircleFillSp />}
    </div>
  );
};
