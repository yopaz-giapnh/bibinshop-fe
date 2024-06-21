import { Typography } from '@/components/ui/typography';
import Rating from '@/features/review/components/rating';
import { Review } from '@/features/review/types';
import { formatDateString } from '@/utils/date';
import Image from 'next/image';

/**
 * ユーザープロフィールレビューカードコンポーネント
 * @returns JSX.Element
 */
type ReviewProps = {
  review: Review;
};

export async function ProfileReviewItem({ review }: ReviewProps) {
  return (
    <div>
      <div className="flex items-baseline">
        <Rating star={review.attributes.rating || 0} readOnly />
        <Typography as="xSmall" element="p" className="text-[14px] text-gray-400">
          ・{formatDateString(review.attributes.created_at)}
        </Typography>
      </div>
      {/* TODO: プロパティ設定 */}
      {/* <Typography as="bold" element="p" className="mt-[8px] text-[14px] text-black-90">
        色： TODO: プロパティ
      </Typography> */}
      <Typography as="xSmall" element="p" className="mt-[16px] text-[16px] text-black-90">
        {review.attributes.review}
      </Typography>
      <div className="mt-[32px] flex items-center rounded-[4px] bg-paleFrostBlue p-[16px]">
        <Image
          // TODO: 商品画像を取得する
          src={'/placeholder-product-image.png'}
          width={100}
          height={100}
          className="rounded-[100px]"
          alt={''}
        />
        <div className="pl-[16px]">
          <Typography as="bold" element="p" className="text-[16px] text-black-90">
            {review.product?.attributes.name}
          </Typography>
          <Typography as="bold" element="p" className="mt-[10px] text-[14px] text-bibinBlue-100">
            {review.product?.attributes.display_price}
          </Typography>
        </div>
      </div>
    </div>
  );
}
