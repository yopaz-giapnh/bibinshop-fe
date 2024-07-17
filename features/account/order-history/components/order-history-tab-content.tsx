import { Order } from '@/features/order/types';
import Pagination from '@/features/pagination/components/pagination';
import OrderHistoryEmptyView from './order-history-empty-view';
import OrderHistoryList from './order-history-list';

type OrderHistoryTabsProps = {
  status: string;
  currentPage: number;
  orders: {
    data: Array<Order>;
    meta: { total_pages: number /* other properties */ };
  };
};

/**
 * 注文履歴タブ内のコンテンツコンポーネント
 * @returns JSX.Element
 */
export async function OrderHistoryTabContent({ status, orders }: OrderHistoryTabsProps) {
  const isEmpty = orders.data.length === 0;

  return (
    <div>
      <div className="overflow-y-auto overflow-x-hidden md:h-screen-calc">
        {isEmpty ? (
          <OrderHistoryEmptyView status={status} />
        ) : (
          <div className="w-full">
            {orders.data.map((order: Order) => (
              <OrderHistoryList key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
      {!!orders.meta.total_pages && <Pagination totalPages={orders.meta.total_pages} />}
    </div>
  );
}
