import { Order } from '@/features/order/types';
import Pagination from '@/features/pagination/components/pagination';
import { Review } from '@/features/review/types';
import OrderHistoryEmptyView from './order-history-empty-view';
import OrderHistoryList from './order-history-list';

type OrderHistoryTabsProps = {
  status: string;
  currentPage: number;
  orders: {
    data: Array<Order>;
    meta: { total_pages: number /* other properties */ };
  };
  reviews: Review[];
};

/**
 * 注文履歴タブ内のコンテンツコンポーネント
 * @returns JSX.Element
 */
export async function OrderHistoryTabContent({ status, orders, reviews }: OrderHistoryTabsProps) {
  const isEmpty = orders.data.length === 0;

  return (
    <div>
      <div>
        {isEmpty ? (
          <OrderHistoryEmptyView status={status} />
        ) : (
          <div className="w-full">
            {orders.data.map((order: Order) => (
              <OrderHistoryList key={order.id} order={order} reviews={reviews} />
            ))}
          </div>
        )}
      </div>
      {!!orders.meta.total_pages && <Pagination totalPages={orders.meta.total_pages} />}
    </div>
  );
}
