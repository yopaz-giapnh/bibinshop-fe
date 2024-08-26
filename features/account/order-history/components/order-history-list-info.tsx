import { Typography } from '@/components/ui/typography';
import { Order } from '@/features/order/types';
import { formatDateString } from '@/utils/date';
import { ChevronRight } from 'lucide-react';
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
      {order.cancellationRequests.length > 0 && (
        <OrderHistoryInfoDetail
          label="キャンセル状況:"
          value={
            order.cancellationRequests[0].attributes.state === 'APPROVED'
              ? 'キャンセル済み'
              : order.cancellationRequests[0].attributes.state === 'REJECTED'
                ? 'キャンセル不可'
                : 'キャンセル中'
          }
        />
      )}
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
