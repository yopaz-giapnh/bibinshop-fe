import { Typography } from '@/components/ui/typography';
import Link from 'next/link';
import * as React from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

type ProductReviewButtonProps = {
  slug: string;
  isReviewed: boolean;
  className?: string;
};

export const ProductReviewButton: React.FC<ProductReviewButtonProps> = ({
  slug,
  isReviewed,
  className
}) => {
  return (
    <Link href={`/account/orders/write-review?slug=${slug}`} passHref className={className}>
      <button
        type="button"
        className="flex items-center justify-center rounded-[100px] border-[1px] bg-gradation px-2 py-[8px]"
      >
        <PencilSquareIcon className="h-[16px] w-[16px] text-white-base" />
        <Typography as="bold" element="p" className="ml-[4px] text-[12px] text-white-base">
          {!isReviewed ? 'レビューを書く' : 'レビューを編集する'}
        </Typography>
      </button>
    </Link>
  );
};
