import { Order } from '../types';

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
