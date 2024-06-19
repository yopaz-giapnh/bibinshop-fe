import Pagination from '@/features/pagination/components/pagination';
import { getAccountOrders } from '../actions';
import { buildShipmentState } from '../utils';
import OrderHistoryEmptyView from './order-history-empty-view';
import OrderHistoryList from './order-history-list';

type OrderHistoryTabsProps = {
  status: string;
  currentPage: number;
};

/**
 * 注文履歴タブ内のコンテンツコンポーネント
 * @returns JSX.Element
 */
export async function OrderHistoryTabContent({ status, currentPage }: OrderHistoryTabsProps) {
  const orders = await getAccountOrders({ ...buildShipmentState(status), page: currentPage });
  const isEmpty = orders.data.length === 0;

  return (
    <div>
      <div className="h-screen-calc overflow-y-auto">
        {isEmpty ? (
          <OrderHistoryEmptyView status={status} />
        ) : (
          <div>
            {orders.data.map((order) => (
              <OrderHistoryList key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
      {!!orders.meta.total_pages && <Pagination totalPages={orders.meta.total_pages} />}
    </div>
  );
}
