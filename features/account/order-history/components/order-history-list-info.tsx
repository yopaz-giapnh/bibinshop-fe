import { Typography } from '@/components/ui/typography';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

type OrderHistoryListInfoProps = {
  order: {
    status: string;
    date: string;
    amount: string;
    number: string;
  };
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
      <div>
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
    <div className="flex items-center justify-between rounded-t-[6px] border-b-[1px] bg-bibinBlue-10 px-[24px] py-[16px]">
      <Typography as="bold" element="p">
        {order.status}
      </Typography>
      <div className="flex w-[500px] items-center justify-between">
        <OrderHistoryInfoDetail label="注文時間:" value={order.date} />
        <OrderHistoryInfoDetail label="支払い金額:" value={order.amount} />
        <OrderHistoryInfoDetail label="注文番号:" value={order.number} />
      </div>
      <Link href="/cart" passHref className="flex items-center">
        <Typography as="small" element="p" className="text-bibinBlue-100">
          注文内容を表示
        </Typography>
        <ChevronRight className="h-6 w-6" color="#51B7FF" />
      </Link>
    </div>
  );
}
