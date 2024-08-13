import { Order } from '@/features/order/types';

export const TAGS = {
  orders: 'orders'
};

export type SortedLineItemGroup = {
  items: Order['lineItems'];
  state: string;
};
