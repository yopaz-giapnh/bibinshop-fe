import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import { Product } from '@/features/product/types';
import { getProductImageUrl } from '@/features/product/utils';
import Rating from '@/features/review/components/rating';
import { Review } from '@/features/review/types';
import Image from 'next/image';

type ReviewParams = {
  productId: string;
  star?: number;
  text?: string;
};

type Props = {
  product: Product;
  review: Review | undefined;
  onReviewStar: ({ productId, star }: ReviewParams) => void;
  onReviewText: ({ productId, text }: ReviewParams) => void;
};

/**
 * レビューを書く画面のアイテムカードコンポーネント
 * @returns JSX.Element
 */
export default function WriteReviewItem({ product, review, onReviewStar, onReviewText }: Props) {
  return (
    <div className="mt-[24px] w-full rounded-[6px] bg-white-base p-[16px] shadow-sm">
      <div className="flex">
        <div className="relative h-[100px] w-[100px]">
          <Image
            src={getProductImageUrl(product?.images[0])}
            layout="fill"
            objectFit="cover"
            alt={''}
          />
        </div>
        <div className="ml-[8px]">
          <Typography as="bold" element="p" className="text-[14px] text-black-90">
            {product?.attributes.name}
          </Typography>
          {/* TODO: 色は api が実装されてから */}
          {/* <Typography as="small" element="p" className="mt-[4px] text-[12px] text-black-70">
            {`色: ${item.color}`}
          </Typography> */}
        </div>
      </div>
      <div className="mt-[16px] flex items-center">
        <Typography as="boldSmall" element="p" className="pr-[16px] text-[20px] text-black-90">
          評価
        </Typography>
        <Rating
          star={review?.attributes.rating ?? 0}
          size={27}
          onClick={(star) => onReviewStar({ productId: product.id, star })}
        />
      </div>
      <Typography as="small" element="p" className="mt-[14px] text-[14px] text-black-90">
        レビュー
      </Typography>
      <Textarea
        className="mt-[8px] h-[160px]"
        placeholder="レビュー"
        defaultValue={review?.attributes.review || ''}
        onChange={(event) => {
          onReviewText({
            productId: product.id,
            text: event.target.value
          });
        }}
      />
    </div>
  );
}
