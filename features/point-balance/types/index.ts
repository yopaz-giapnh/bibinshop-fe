import { components } from '@/lib/api/storefront';

export type PointUsageHistory = components['schemas']['PointTransaction'];
export type PointAquisitionHistory = components['schemas']['Point'];
export type MergedHistoryItem = {
  id: string;
  type: 'point_transaction' | 'point';
  date: string;
  time: string;
  amount: number;
  reason: string;
  orderId?: string | null;
  usedAmount?: number;
  available?: number;
  expiresAt?: string | null;
};
