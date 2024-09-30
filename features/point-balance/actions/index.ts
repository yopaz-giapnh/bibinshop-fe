'use server';

import { apiClient } from '@/config/api-client';
import { isNotFound } from '@/utils/api';

export async function getPointAquisitionHistory(params?: { page?: number; perPage?: number }) {
  const { response, error, data } = await apiClient.GET('/api/v2/storefront/account/points', {
    query: {
      page: params?.page,
      per_page: params?.perPage
    },
    fetch: (request) => {
      return fetch(request, { cache: 'no-cache' });
    }
  });

  if (isNotFound(response)) {
    return [];
  }

  if (error) {
    throw error;
  }

  return data.data || [];
}

export async function getPointUsageHistory(params?: { page?: number; perPage?: number }) {
  const { response, error, data } = await apiClient.GET(
    '/api/v2/storefront/account/point_history',
    {
      query: {
        page: params?.page,
        per_page: params?.perPage
      },
      fetch: (request) => {
        return fetch(request, { cache: 'no-cache' });
      }
    }
  );

  if (isNotFound(response)) {
    return [];
  }

  if (error) {
    throw error;
  }

  return data.data || [];
}

export async function patchCartPoints(pointAmount: number) {
  try {
    await apiClient.PATCH(`/api/v2/storefront/cart/points`, {
      params: {
        query: {
          amount: pointAmount
        }
      }
    });
  } catch (error) {
    return { success: false, message: 'ポイントの適用に失敗しました' };
  }
  return { success: true, message: 'ポイントが適用されました' };
}

export async function deleteCartPoints(pointAmount: number) {
  try {
    await apiClient.DELETE(`/api/v2/storefront/cart/points`, {
      params: {
        query: {
          amount: pointAmount
        }
      }
    });
  } catch (error) {
    return { success: false, message: 'ポイントの削除に失敗しました' };
  }
  return { success: true, message: 'ポイントが取消されました' };
}
