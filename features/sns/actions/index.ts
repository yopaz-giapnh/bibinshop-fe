'use server';

import { apiClient } from '@/config/api-client';
import { isUserAvatarSchema, isUserProfileSchema } from '@/features/account/profile/utils';
import { revalidateTag } from 'next/cache';
import { Concerns, TAGS } from '../constants';
import {
  HairConcern,
  HealthConcern,
  PersonalColor,
  SkinConcern,
  SkinType,
  isUserProfile
} from '../utils';

// todo: add includes user tags
const includes = 'avatars,user_profile';

type GetFollowersParams = {
  page: number;
  unique_key: string;
};

export async function getFollowers({ page, unique_key }: GetFollowersParams) {
  // no-cache is used to prevent the cache from being used when the user follows or unfollows
  const { data, error } = await apiClient.GET('/api/v2/storefront/users/{unique_key}/followers', {
    params: {
      path: {
        unique_key
      },
      query: {
        page: page + 1,
        include: includes
      }
    },
    cache: 'no-cache'
  });

  if (error) {
    throw error;
  }

  const { data: followers, included } = data;

  const avatars = included?.filter(isUserAvatarSchema) || [];
  const userProfiles = included?.filter(isUserProfileSchema) || [];

  const reshapedFollowers = followers?.map((follower) => {
    const userAvatars = follower.relationships?.avatars?.data || [];
    const userProfileId = follower.relationships?.user_profile?.data?.id;
    const avatar =
      userAvatars.length > 0 ? avatars.find((a) => a.id === userAvatars[0].id) : undefined;
    const userProfile = userProfiles.find((profile) => profile.id === userProfileId);

    return {
      ...follower,
      avatar: avatar
        ? {
            ...avatar,
            url: `${avatar.attributes?.styles?.[avatar.attributes.styles.length - 1]?.url}`
          }
        : undefined,
      userProfile: userProfile
    };
  });

  return {
    ...data,
    data: reshapedFollowers
  };
}

export async function getFollowees({ page, unique_key }: GetFollowersParams) {
  // no-cache is used to prevent the cache from being used when the user follows or unfollows
  const { data, error } = await apiClient.GET('/api/v2/storefront/users/{unique_key}/followees', {
    params: {
      path: {
        unique_key
      },
      query: {
        page: page + 1,
        include: includes
      }
    },
    cache: 'no-cache'
  });

  if (error) {
    throw error;
  }

  const { data: followees, included } = data;

  const avatars = included?.filter(isUserAvatarSchema) || [];
  const userProfiles = included?.filter(isUserProfileSchema) || [];

  const reshapedFollowees = followees?.map((followee) => {
    const userAvatars = followee.relationships?.avatars?.data || [];
    const userProfileId = followee.relationships?.user_profile?.data?.id;
    const avatar =
      userAvatars.length > 0 ? avatars.find((a) => a.id === userAvatars[0].id) : undefined;
    const userProfile = userProfiles.find((profile) => profile.id === userProfileId);

    return {
      ...followee,
      avatar: avatar
        ? {
            ...avatar,
            url: `${avatar.attributes?.styles?.[avatar.attributes.styles.length - 1]?.url}`
          }
        : undefined,
      userProfile: userProfile
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

export async function getConcerns(): Promise<Concerns | null> {
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
        },
        fetch: (request: Request) => {
          return fetch(request, { next: { tags: [TAGS.concerns] } });
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
      birthyear: profile.attributes.birthyear,
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

type userProfileParams = {
  user_profile: {
    skin_type?: SkinType;
    personal_color?: PersonalColor;
    birthyear?: number;
    skin_concerns?: SkinConcern;
    scalp_hair_concerns?: HairConcern;
    health_concerns?: HealthConcern;
  };
};

export async function createUserProfile({ user_profile }: userProfileParams) {
  const { error } = await apiClient.POST('/api/v2/storefront/account/profile', {
    body: { user_profile }
  });

  if (error) {
    throw error;
  }

  revalidateTag(TAGS.concerns);
}

export async function updateUserProfile({ user_profile }: userProfileParams) {
  const { error } = await apiClient.PATCH('/api/v2/storefront/account/profile', {
    body: { user_profile }
  });

  if (error) {
    throw error;
  }

  revalidateTag(TAGS.concerns);
}
