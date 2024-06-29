import { Typography } from '@/components/ui/typography';
import { Order } from '@/features/order/types';
import { getShipmentStateTitle } from '@/features/order/utils';
import { findImageFromLineItem } from '@/features/product/utils';
import { FilePen } from 'lucide-react';
import Link from 'next/link';
import OrderHistoryItem from './order-history-item';
import OrderHistoryListInfo from './order-history-list-info';

type OrderHistoryListProps = {
  order: Order;
};

/**
 * 注文履歴リスト画面
 * @returns JSX.Element
 */
export default function OrderHistoryList({ order }: OrderHistoryListProps) {
  const isShipped = order.attributes.shipment_state === 'shipped';
  const productSlugs = order.products.map((product) => product.attributes.slug);

  return (
    <div className="mb:mt-[24px] mt-[16px] rounded-[6px] border-[1px] bg-white-base shadow-sm">
      <OrderHistoryListInfo order={order} />
      <div className="flex w-full justify-between px-[16px]">
        <div className="flex w-full flex-col">
          {order.lineItems.map((item, index) => {
            const image = findImageFromLineItem({
              lineItem: item,
              variants: order.variants,
              images: order.images
            });
            return (
              <>
                <OrderHistoryItem
                  key={item.id}
                  item={item}
                  image={image}
                  status={getShipmentStateTitle(order)}
                />
                {index !== order.lineItems.length - 1 && <div className="border-[1px]" />}
              </>
            );
          })}
        </div>
        <div className="mr-[20px] mt-[12px] hidden md:block">
          {isShipped && (
            <Link
              href={`/account/orders/write-review?${productSlugs.map((slug) => `slug=${slug}`).join('&')}`}
              passHref
            >
              <button
                type="button"
                className="mt-[8px] flex w-[222px] items-center justify-center rounded-[100px] border-[1px] border-bibinBlue-100 py-[8px]"
              >
                <FilePen className="h-[18px] w-[18px]" color="#51B7FF" />
                <Typography
                  as="bold"
                  element="p"
                  className="ml-[8px] text-[14px] text-bibinBlue-100"
                >
                  レビューを書く
                </Typography>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
