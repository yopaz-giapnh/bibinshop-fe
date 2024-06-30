import { Typography } from '@/components/ui/typography';
import { Order } from '@/features/order/types';
import { getShipmentStateTitle } from '@/features/order/utils';
import { formatDateString } from '@/utils/date';
import { ChevronRight, FilePen } from 'lucide-react';
import Link from 'next/link';

type OrderHistoryListInfoProps = {
  order: Order;
};

type OrderHistoryInfoDetailProps = {
  label: string;
  value: string;
};

/**
 * 注文履歴リスト上部の情報コンポーネント
 * @returns JSX.Element
 */
export default function OrderHistoryListInfo({ order }: OrderHistoryListInfoProps) {
  const isShipped = order.attributes.shipment_state === 'shipped';
  const productSlugs = order.products.map((product) => product.attributes.slug);

  function OrderHistoryInfoDetail({ label, value }: OrderHistoryInfoDetailProps) {
    return (
      <div className="flex md:block">
        <Typography as="small" element="p" className="text-[12px] text-black-50">
          {label}
        </Typography>
        <Typography as="bold" element="p" className="text-[14px] text-black-90">
          {value}
        </Typography>
      </div>
    );
  }

  return (
    <div className="items-center justify-between rounded-t-[6px] border-b-[1px] bg-bibinBlue-10 px-[24px] py-[16px] md:flex">
      <div className="flex items-center justify-between">
        <Typography as="bold" element="p">
          {getShipmentStateTitle(order)}
        </Typography>
        {isShipped && (
          <Link
            href={`/account/orders/write-review?${productSlugs.map((slug) => `slug=${slug}`).join('&')}`}
            passHref
            className="md:hidden"
          >
            <button
              type="button"
              className="flex w-[150px] items-center justify-center rounded-[100px] border-[1px] border-bibinBlue-100 py-[8px]"
            >
              <FilePen className="h-[16px] w-[16px]" color="#51B7FF" />
              <Typography as="bold" element="p" className="ml-[8px] text-[12px] text-bibinBlue-100">
                レビューを書く
              </Typography>
            </button>
          </Link>
        )}
      </div>
      <div className="mt-[8px] items-center justify-between md:mt-0 md:flex md:w-[500px]">
        <div className="flex justify-between md:w-[280px]">
          <OrderHistoryInfoDetail
            label="注文時間:"
            value={formatDateString(order.attributes.created_at)}
          />
          <OrderHistoryInfoDetail
            label="支払い金額:"
            value={order.attributes.display_total || ''}
          />
        </div>
        <OrderHistoryInfoDetail label="注文番号:" value={order.attributes.number || ''} />
      </div>
      {/* TODO: 取得した注文履歴の個別の注文内容をid指定でordersに渡す */}
      <Link
        href={`/account/orders/${order.attributes.number}`}
        passHref
        className="mt-[12px] flex items-center md:mt-0"
      >
        <Typography as="small" element="p" className="text-bibinBlue-100 ">
          注文内容を表示
        </Typography>
        <ChevronRight className="h-6 w-6" color="#51B7FF" />
      </Link>
    </div>
  );
}
