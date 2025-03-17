import { Typography } from '@/components/ui/typography';
import { LineItem } from '@/features/cart/types';
import { ImageSchema } from '@/features/product/types';
import { Review } from '@/features/review/types';
import Image from 'next/image';
import BuyAgainModal from './buy-again-modal';
import { ProductReviewButton } from './product-review-button';

type OrderHistoryItemProps = {
  item: LineItem;
  image: ImageSchema | undefined;
  status?: string;
  showBuyAgain?: boolean;
  showPrice?: boolean;
  reviews?: Review[];
  showReviewButton?: boolean;
};

/**
 * 注文履歴アイテムの詳細コンポーネント
 * @returns JSX.Element
 */
export default function OrderHistoryItem({
  item,
  image,
  status,
  showBuyAgain = true,
  reviews,
  showReviewButton = false
}: OrderHistoryItemProps) {
  const isUnpaid = status === '発送予定';
  const variantId = item.relationships.variant?.data?.id;
  const imageUrl = image?.attributes.styles?.[image?.attributes.styles?.length - 1].url;

  const isReviewed = reviews?.some(
    (review) => review.relationships.product?.data?.id === item.relationships.variant?.data?.id
  );

  return (
    <div className="flex py-[16px]">
      <div className="relative h-[80px] w-[80px] md:h-[100px] md:w-[100px]">
        <Image src={imageUrl || '/placeholder-product-image.png'} fill alt={''} />
      </div>
      <div className="ml-[8px] flex flex-col justify-between">
        <div>
          <Typography
            as="bold"
            element="p"
            className="max-w-overflow-hidden max-w-[230px] whitespace-normal break-words text-[14px] text-black-90 md:max-w-full"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {item.attributes.name}
          </Typography>
          {item.attributes.options_text && (
            <Typography
              as="small"
              element="p"
              className="mb-2 mt-[4px] text-[12px] text-black-70 md:mb-0"
            >
              {item.attributes.options_text}
            </Typography>
          )}
          <Typography as="small" element="p" className="mt-[4px] text-[12px] text-black-70">
            購入数: {item.attributes.quantity}
          </Typography>
          <Typography
            as="boldSmall"
            element="p"
            className="mt-[4px] text-[14px] text-bibinBlue-100"
          >
            {item.attributes.display_price}
          </Typography>
        </div>
        <div className="flex flex-wrap gap-2">
          {showReviewButton && item.attributes.slug && (
            <ProductReviewButton
              slug={item.attributes.slug}
              isReviewed={!!isReviewed}
              className="h-[25px] md:h-[30px]"
            />
          )}
          {!isUnpaid && !!variantId && showBuyAgain && (
            <BuyAgainModal
              variantIds={[variantId]}
              buttonStyle="md:w-[105px] md:h-[30px] w-[80px] h-[25px] py-[18px]"
              buttonTextStyle="text-[12px] text-white-base"
            />
          )}
        </div>
      </div>
    </div>
  );
}
