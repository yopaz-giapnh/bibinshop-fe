'use server';

import { apiClient } from '@/config/api-client';

type CancelOrderParams = {
  orderId: string;
  reason: string;
};
export async function cancelOrder({ orderId, reason }: CancelOrderParams) {
  const { error } = await apiClient.POST('/api/v2/storefront/cancels', {
    body: {
      order_id: orderId,
      reason: reason
    }
  });
  if (error) {
    console.log('Error:', error);
    return false;
  }
  return true;
}
