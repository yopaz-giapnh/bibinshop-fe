import { Order } from '@/features/order/types';
import { RatingItem, Ratings } from '../types';

export const TAGS = {
  orders: 'orders'
};

export const RATING_ITEMS: RatingItem[] = [
  { key: 'effectiveness', label: '効果実感' },
  { key: 'satisfaction', label: '商品の満足度' },
  { key: 'repurchase', label: 'リピート購入意欲' },
  { key: 'finish', label: '仕上がり' },
  { key: 'skin_type', label: '自分の肌質に合っているか' }
];

export const RATING_FIELDS = {
  effectiveness: 'effectiveness',
  satisfaction: 'satisfaction',
  repurchase: 'repurchase',
  finish: 'finish',
  skin_type: 'skin_type'
} as const;

export const DEFAULT_RATINGS: Ratings = {
  effectiveness: 1,
  satisfaction: 1,
  repurchase: 1,
  finish: 1,
  skin_type: 1
};

export type SortedLineItemGroup = {
  items: Order['lineItems'];
  state: string;
};
