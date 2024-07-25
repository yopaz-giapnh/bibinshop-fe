import { Order } from '../types';

type SortedLineItems = {
  [key: string]: Order['lineItems'];
};

export const getShipmentStateTitle = (order: Order) => {
  switch (order.attributes.shipment_state) {
    case 'ready':
    case 'pending':
      return '発送予定';
    case 'shipped':
    case 'partial':
      return '配送中';
    case 'delivered':
      return '配送完了';
    default:
      return order.attributes.shipment_state; // 未知の状態はそのまま表示
  }
};

export const getTabValue = (status: string) => {
  switch (status) {
    case 'ready':
    case 'pending':
      return '発送予定';
    case 'shipped':
    case 'partial':
      return '配送中';
    case 'delivered':
      return '配送完了';
    case 'unknown':
      return '状態不明';
    default:
      return status; // 未知の状態はそのまま表示
  }
};
// 出荷状態でアイテムをソート
export function sortLineItemsByShipmentState(order: Order): SortedLineItems {
  if (order.shipments.length === 0) {
    // shipments が空の場合、order の shipment_state を使用
    const state = order.attributes.shipment_state || 'unknown';
    return {
      [state]: order.lineItems
    };
  }

  return order.lineItems.reduce<SortedLineItems>((acc, item) => {
    const shipment = order.shipments.find((shipment) =>
      shipment.relationships.line_items?.data?.some(
        (lineItem) => lineItem && lineItem.id === item.id
      )
    );
    const state = shipment?.attributes.state || order.attributes.shipment_state || 'unknown';
    if (!acc[state]) acc[state] = [];
    acc[state].push(item);
    return acc;
  }, {});
}
