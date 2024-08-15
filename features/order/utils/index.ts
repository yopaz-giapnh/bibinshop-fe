import { SortedLineItemGroup } from '@/features/account/order-history/constants';
import { Order } from '../types';

type SortedLineItems = SortedLineItemGroup[];

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
    case 'all':
      return 'すべて';
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

export function extractSlugs(items: SortedLineItemGroup[]) {
  return items
    .filter((group) => group.state === 'shipped' || group.state === 'delivered')
    .flatMap((group) => group.items.map((item) => item.attributes.slug));
}

export function sortLineItemsByShipment(order: Order): SortedLineItems {
  if (order.shipments.length === 0) {
    return [{ items: order.lineItems, state: 'unknown' }];
  }

  const result: SortedLineItems = order.shipments.map((shipment) => ({
    items: [],
    state: shipment.attributes.state ?? ''
  }));

  order.shipments.forEach((shipment, index) => {
    shipment.relationships.line_items?.data?.forEach((lineItemRef) => {
      const lineItem = order.lineItems.find((item) => item.id === lineItemRef?.id);
      if (lineItem) {
        result[index].items.push(lineItem);
      }
    });
  });

  const assignedLineItemIds = new Set(
    result.flatMap((group) => group.items.map((item) => item.id))
  );
  const unassignedLineItems = order.lineItems.filter((item) => !assignedLineItemIds.has(item.id));

  if (unassignedLineItems.length > 0) {
    result.push({ items: unassignedLineItems, state: 'unknown' });
  }

  return result;
}
