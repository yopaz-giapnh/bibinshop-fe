import { Order } from '@/features/order/types';
import { RatingItem, Ratings } from '../types';

export const TAGS = {
  orders: 'orders'
};

export const RATING_ITEMS: RatingItem[] = [
  { key: 'texture', label: 'ツヤ' },
  { key: 'finish', label: '発色' },
  { key: 'effectiveness', label: 'ラメ' },
  { key: 'longevity', label: 'マット' },
  { key: 'usability', label: '使い心地' }
];

export const RATING_FIELDS = {
  texture: 'texture',
  finish: 'finish',
  effectiveness: 'effectiveness',
  longevity: 'longevity',
  usability: 'usability'
} as const;

export const DEFAULT_RATINGS: Ratings = {
  texture: 1,
  finish: 1,
  effectiveness: 1,
  longevity: 1,
  usability: 1
};

export type SortedLineItemGroup = {
  items: Order['lineItems'];
  state: string;
};
