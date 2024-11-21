import { Typography } from '@/components/ui/typography';
import { FilePen } from 'lucide-react';
import Link from 'next/link';

type ReviewButtonProps = {
  groupSlugs: string[];
  isReviewed: boolean;
  className?: string;
};

export const ReviewButton: React.FC<ReviewButtonProps> = ({
  groupSlugs,
  isReviewed,
  className
}) => {
  if (isReviewed) {
    return (
      <button
        type="button"
        className={`mt-[8px] flex w-[222px] cursor-not-allowed items-center justify-center rounded-[100px] border-[1px] border-gray-300 py-[8px] ${className}`}
        disabled
      >
        <Typography as="bold" element="p" className="text-[14px] text-gray-400">
          レビュー済み
        </Typography>
      </button>
    );
  }

  return (
    <Link
      href={`/account/orders/write-review?${groupSlugs.map((slug) => `slug=${slug}`).join('&')}`}
      passHref
      className={className}
    >
      <button
        type="button"
        className="mt-[8px] flex w-[222px] items-center justify-center rounded-[100px] border-[1px] border-bibinBlue-100 py-[8px]"
      >
        <FilePen className="h-[18px] w-[18px]" color="#51B7FF" />
        <Typography as="bold" element="p" className="ml-[8px] text-[14px] text-bibinBlue-100">
          レビューを書く
        </Typography>
      </button>
    </Link>
  );
};
