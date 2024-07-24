import { Order } from '../types';

type SortedLineItems = {
  [key: string]: Order['lineItems'];
};

export const getShipmentStateTitle = (order: Order) => {
  switch (order.attributes.shipment_state) {
    case 'ready':
      return '発送予定';
    case 'shipped':
      return '配送中';
    case 'delivered':
      return '配送完了';
    default:
      return '発送予定';
  }
};

export const getTabValue = (status: string) => {
  switch (status) {
    case 'ready':
      return '発送予定';
    case 'shipped':
      return '配送中';
    case 'delivered':
      return '配送完了';
    default:
      return '発送予定';
  }
};

// 出荷状態でアイテムをソート
export function sortLineItemsByShipmentState(order: Order): SortedLineItems {
  return order.lineItems.reduce<SortedLineItems>((acc, item) => {
    const shipment = order.shipments.find((shipment) =>
      shipment.relationships.line_items?.data?.some(
        (lineItem) => lineItem && lineItem.id === item.id
      )
    );
    const state = shipment?.attributes.state || 'unknown';
    if (!acc[state]) acc[state] = [];
    acc[state].push(item);
    return acc;
  }, {});
}
