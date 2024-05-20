import OrderHistoryActionButton from './order-history-action-button';
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
  return (
    <div className="mt-[24px] rounded-[6px] border-[1px] bg-white-base shadow-sm">
      <OrderHistoryListInfo order={order} />
      <div className="flex justify-between px-[16px]">
        <div className="flex flex-col">
          {order.items.map((item, index) => (
            <OrderHistoryItem key={index} item={item} />
          ))}
        </div>
        <OrderHistoryActionButton status={order.status} />
      </div>
    </div>
  );
}
