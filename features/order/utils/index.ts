import { Order } from '../types';

export const getShipmentStateTitle = (order: Order) => {
  switch (order.attributes.shipment_state) {
    case 'pending':
      return '未払い';
    case 'ready':
      return '処理中';
    case 'shipped':
      return '出荷済み';
    default:
      return '未払い';
  }
};
