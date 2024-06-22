import { Typography } from '@/components/ui/typography';
import { Order } from '@/features/order/types';
import { isString } from '@/utils/string';
import { FilePen } from 'lucide-react';
import Link from 'next/link';
import BuyAgainModal from './buy-again-modal';

type Props = {
  order: Order;
};

/**
 * 注文履歴詳細ページの下部のボタンコンポーネント
 * @returns JSX.Element
 */
export default function OrderHistoryDetailBottomButton({ order }: Props) {
  const variantIds =
    order.relationships.variants?.data?.map((variant) => variant?.id).filter(isString) || [];
  const productSlugs = order.products.map((product) => product.attributes.slug);
  const isShipped = order.attributes.shipment_state === 'shipped';

  return (
    <div className="mr-[20px] mt-[24px] flex items-center justify-between">
      <BuyAgainModal
        variantIds={variantIds}
        buttonStyle="w-[222px]"
        buttonIconStyle="h-[18px] w-[18px]"
        buttonTextStyle="ml-[8px] text-[14px] text-white-base"
      />
      {isShipped && (
        <Link
          href={`/account/orders/write-review?${productSlugs.map((slug) => `slug=${slug}`).join('&')}`}
          passHref
        >
          <button
            type="button"
            className="ml-[8px] flex w-[222px] items-center justify-center rounded-[100px] border-[1px] border-bibinBlue-100 py-[8px]"
          >
            <FilePen className="h-[18px] w-[18px]" color="#51B7FF" />
            <Typography as="bold" element="p" className="ml-[8px] text-[14px] text-bibinBlue-100">
              レビューを書く
            </Typography>
          </button>
        </Link>
      )}
    </div>
  );
}
