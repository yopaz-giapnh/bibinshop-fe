import { Typography } from '@/components/ui/typography';
import { LineItem } from '@/features/cart/types';
import { ImageSchema } from '@/features/product/types';
import Image from 'next/image';
import BuyAgainModal from './buy-again-modal';

type OrderHistoryItemProps = {
  item: LineItem;
  image: ImageSchema | undefined;
  status: string;
};

/**
 * 注文履歴アイテムの詳細コンポーネント
 * @returns JSX.Element
 */
export default function OrderHistoryItem({ item, image, status }: OrderHistoryItemProps) {
  const isUnpaid = status === '未払い';
  const variantId = item.relationships.variant?.data?.id;
  const imageUrl = image?.attributes.styles?.[image?.attributes.styles?.length - 1].url;

  return (
    <div className="flex border-b-[1px] py-[16px]">
      <div className="relative h-[80px] w-[80px] md:h-[100px] md:w-[100px]">
        <Image
          src={imageUrl || '/placeholder-product-image.png'}
          layout="fill"
          objectFit="cover"
          alt={''}
        />
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
          {/* TODO: /api/v2/storefront/account/ordersでdetail取得後追加 */}
          {/* <Typography as="small" element="p" className="mt-[4px] text-[12px] text-black-70">
            色：vol. 6
          </Typography> */}
        </div>
        {!isUnpaid && !!variantId && (
          <BuyAgainModal
            variantIds={[variantId]}
            buttonStyle="md:w-[105px] md:h-[30px] w-[80px] h-[25px]"
            buttonIconStyle="md:h-[16px] md:w-[16px] h-[12px] w-[12px]"
            buttonTextStyle="ml-[8px] text-[12px] text-white-base"
          />
        )}
      </div>
    </div>
  );
}
