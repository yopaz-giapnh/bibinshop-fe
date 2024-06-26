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
        <div className="ml-[16px] md:ml-[8px]">
          <Typography
            as="bold"
            element="p"
            className="max-w-[200px] overflow-hidden whitespace-normal break-words text-[14px] text-black-90 md:max-w-full"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 4,
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {product?.attributes.name}
          </Typography>
          {/* TODO: 色は api が実装されてから */}
          {/* <Typography as="small" element="p" className="mt-[4px] text-[12px] text-black-70">
            {`色: ${item.color}`}
          </Typography> */}
        </div>
      </div>
      <div className="mt-[12px] flex items-center md:mt-[16px]">
        <Typography
          as="boldSmall"
          element="p"
          className="pr-[16px] text-[16px] text-black-90 md:text-[20px]"
        >
          評価
        </Typography>
        <Rating
          star={review?.attributes.rating ?? 0}
          size={27}
          onClick={(star) => onReviewStar({ productId: product.id, star })}
        />
      </div>
      <Typography
        as="small"
        element="p"
        className="mt-[12px] text-[14px] text-black-90 md:mt-[14px]"
      >
        レビュー
      </Typography>
      <Textarea
        className="mt-[8px] h-[160px] bg-gray-50"
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
