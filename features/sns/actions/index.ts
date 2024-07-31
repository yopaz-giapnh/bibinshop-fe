'use server';

import { apiClient } from '@/config/api-client';
import { isUserAvatarSchema } from '@/features/account/profile/utils';
import { isUserProfile } from '../utils';

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
        include: includes
      }
    }
  });

  if (error) {
    throw error;
  }

  const { data: followers, included } = data;

  const avatars = included?.filter(isUserAvatarSchema) || [];

  const reshapedFollowers = followers?.map((follower: any) => {
    const userAvatars = follower.relationships?.avatars?.data || [];
    const avatar =
      userAvatars.length > 0 ? avatars.find((a) => a.id === userAvatars[0].id) : undefined;

    return {
      ...follower,
      avatar: avatar
        ? {
            ...avatar,
            url: `${avatar.attributes?.styles?.[avatar.attributes.styles.length - 1]?.url}`
          }
        : undefined
    };
  });

  return {
    ...data,
    data: reshapedFollowers
  };
}

export async function getFollowees({ page, unique_key }: GetFollowersParams) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/users/{unique_key}/followees', {
    params: {
      path: {
        unique_key
      },
      query: {
        page,
        include: includes
      }
    }
  });

  if (error) {
    throw error;
  }

  const { data: followees, included } = data;

  const avatars = included?.filter(isUserAvatarSchema) || [];

  const reshapedFollowees = followees?.map((followee: any) => {
    const userAvatars = followee.relationships?.avatars?.data || [];
    const avatar =
      userAvatars.length > 0 ? avatars.find((a) => a.id === userAvatars[0].id) : undefined;

    return {
      ...followee,
      avatar: avatar
        ? {
            ...avatar,
            url: `${avatar.attributes?.styles?.[avatar.attributes.styles.length - 1]?.url}`
          }
        : undefined
    };
  });

  return {
    ...data,
    data: reshapedFollowees
  };
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

export async function getConcerns() {
  try {
    const attributes = await getCurrentUserAttributes();

    if (!attributes || !attributes.unique_key) {
      console.warn('User not logged in');
      return null;
    }

    const { data, error } = await apiClient.GET('/api/v2/storefront/users/{unique_key}', {
      params: {
        path: {
          unique_key: attributes.unique_key
        },
        query: {
          include:
            'user_profile.skin_type,user_profile.personal_color,user_profile.skin_concerns,user_profile.scalp_hair_concerns,user_profile.health_concerns'
        }
      }
    });

    if (error) {
      console.error('Error fetching user data:', error);
      return null;
    }

    if (!data.included) {
      console.warn('No included data');
      return null;
    }

    const profile = data.included.filter(isUserProfile)[0];
    if (!profile || !profile.attributes) {
      console.warn('No profile data');
      return null;
    }

    return {
      skinType: profile.attributes.skin_type,
      personalColor: profile.attributes.personal_color,
      skinConcerns: profile.attributes.skin_concerns,
      hairConcerns: profile.attributes.scalp_hair_concerns,
      healthConcerns: profile.attributes.health_concerns
    };
  } catch (error) {
    console.error('Error in getConcerns:', error);
    return null;
  }
}

async function getCurrentUserAttributes() {
  const { data, error } = await apiClient.GET('/api/v2/storefront/account', {
    params: {
      query: {
        'fields[user]': 'unique_key'
      }
    }
  });

  if (error) {
    console.error('Error get user data:', error);
    return null;
  }

  return data?.data?.attributes as { unique_key: string };
}
