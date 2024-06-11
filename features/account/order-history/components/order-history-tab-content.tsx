import { getShipmentStateTitle } from '@/features/order/utils';
import Pagenation from '../../components/pagenation';
import { getAccountOrders } from '../actions';
import OrderHistoryEmptyView from './order-history-empty-view';
import OrderHistoryList from './order-history-list';

type OrderHistoryTabsProps = {
  status: string;
};

/**
 * 注文履歴タブ内のコンテンツコンポーネント
 * @returns JSX.Element
 */
export async function OrderHistoryTabContent({ status }: OrderHistoryTabsProps) {
  const orders = await getAccountOrders();
  const filteredOrders = status
    ? orders.data.filter((order) => getShipmentStateTitle(order) === status)
    : orders.data;
  const isEmpty = filteredOrders.length === 0;

  return (
    <div>
      <div className="h-screen-calc overflow-y-auto">
        {isEmpty ? (
          <OrderHistoryEmptyView status={status} />
        ) : (
          <div>
            {filteredOrders.map((order) => (
              <OrderHistoryList key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
      <Pagenation />
    </div>
  );
}
