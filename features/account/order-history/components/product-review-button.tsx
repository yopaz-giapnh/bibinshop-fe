import { Typography } from '@/components/ui/typography';
import { FilePen } from 'lucide-react';
import Link from 'next/link';

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
        className="flex items-center justify-center rounded-[100px] border-[1px] border-bibinBlue-100 px-2 py-[8px]"
      >
        <FilePen className="h-[14px] w-[14px]" color="#51B7FF" />
        <Typography as="bold" element="p" className="ml-[4px] text-[12px] text-bibinBlue-100">
          {!isReviewed ? 'レビューを書く' : 'レビューを編集する'}
        </Typography>
      </button>
    </Link>
  );
};
