import { Typography } from '@/components/ui/typography';
import { FilePen } from 'lucide-react';
import Link from 'next/link';
import OrderHistoryItem from './order-history-item';
import OrderHistoryListInfo from './order-history-list-info';

type OrderHistoryListProps = {
  order: {
    status: string;
    date: string;
    amount: string;
    number: string;
    items: {
      image: string;
      alt: string;
      name: string;
      details: string;
    }[];
  };
};

/**
 * 注文履歴リスト画面
 * @returns JSX.Element
 */
export default function OrderHistoryList({ order }: OrderHistoryListProps) {
  const isShipped = order.status === '出荷済み';

  return (
    <div className="mt-[24px] rounded-[6px] border-[1px] bg-white-base shadow-sm">
      <OrderHistoryListInfo order={order} />
      <div className="flex justify-between px-[16px]">
        <div className="flex flex-col">
          {order.items.map((item, index) => (
            <OrderHistoryItem key={index} item={item} status={order.status} />
          ))}
        </div>
        <div className="mr-[20px] mt-[12px]">
          {/* TODO: 取得した注文履歴のidを渡してwrite-reviewに遷移する */}
          {isShipped && (
            <Link href="/account/orders/{orderId}/write-review" passHref>
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
