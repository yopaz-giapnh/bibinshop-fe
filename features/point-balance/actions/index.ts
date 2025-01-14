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

export async function getAvailablePoints() {
  const { response, error, data } = await apiClient.GET('/api/v2/storefront/account/points', {
    query: {
      page: 1,
      per_page: 1
    },
    fetch: (request) => {
      return fetch(request, { cache: 'no-cache' });
    }
  });

  if (isNotFound(response)) {
    return 0;
  }

  if (error) {
    throw error;
  }

  // データが存在しない、または期待された形式でない場合の処理
  if (!data || !Array.isArray(data.data) || data.data.length === 0) {
    return 0;
  }

  // 型ガードを使用してデータの形式を確認
  const firstItem = data.data[0];
  if ('attributes' in firstItem && 'available' in firstItem.attributes) {
    return firstItem.attributes.available || 0;
  } else {
    return 0;
  }
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
    const { error } = await apiClient.PATCH(`/api/v2/storefront/cart/points`, {
      params: {
        query: {
          amount: pointAmount
        }
      }
    });
    if (error) {
      throw error;
    }
    return { success: true, message: 'ポイントが適用されました' };
  } catch (error) {
    return { success: false, message: 'ポイントの適用に失敗しました' };
  }
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

export async function getPointsRate() {
  const { data, error } = await apiClient.GET(`/api/v2/storefront/account/points_rate`, {
    params: {}
  });
  if (error) {
    return 0;
  }
  return data.earn_rate || 0;
}
