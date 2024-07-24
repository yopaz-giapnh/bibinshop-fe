'use server';

import { apiClient } from '@/config/api-client';

// todo: add includes user tags
const includes = 'avatars';

type GetFollowersParams = {
  page: number;
  unique_key: string;
};

export async function getFollowers({ page, unique_key }: GetFollowersParams) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/users/{unique_key}/followers', {
    params: {
      path: {
        unique_key
      },
      query: {
        page,
        includes
      }
    }
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function getFollowees({ page, unique_key }: GetFollowersParams) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/users/{unique_key}/followees', {
    params: {
      path: {
        unique_key
      },
      query: {
        page,
        includes
      }
    }
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function follow({ unique_key }: { unique_key: string }) {
  const { error } = await apiClient.POST('/api/v2/storefront/users/{unique_key}/follow', {
    params: {
      path: {
        unique_key
      }
    }
  });
  if (error) {
    throw error;
  }
}

export async function unfollow({ unique_key }: { unique_key: string }) {
  const { error } = await apiClient.DELETE('/api/v2/storefront/users/{unique_key}/follow', {
    params: {
      path: {
        unique_key
      }
    }
  });
  if (error) {
    throw error;
  }
}
