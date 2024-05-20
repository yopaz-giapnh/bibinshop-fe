import OrderHistoryEmptyView from './order-history-empty-view';
import OrderHistoryList from './order-history-list';
import OrderHistoryPagenation from './order-history-pagenation';

type OrderHistoryTabsProps = {
  orders: {
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
  }[];
  status: string | null;
};

/**
 * 注文履歴タブ内のコンテンツコンポーネント
 * @returns JSX.Element
 */
export default function OrderHistoryTabContent({ orders, status }: OrderHistoryTabsProps) {
  const filteredOrders = status ? orders.filter((order) => order.status === status) : orders;

  return (
    <div>
      <div className="max-h-[575px] overflow-y-auto">
        {filteredOrders.length > 0 ? (
          <div>
            {filteredOrders.map((order, index) => (
              <OrderHistoryList key={index} order={order} />
            ))}
          </div>
        ) : (
          <OrderHistoryEmptyView status={status} />
        )}
      </div>
      <OrderHistoryPagenation />
    </div>
  );
}
