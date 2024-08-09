'use server';

import { apiClient } from '@/config/api-client';
import { UserAvatarSchema } from '@/features/account/profile/types';
import {
  isSocialLinkSchema,
  isUserAvatarSchema,
  isUserProfileSchema
} from '@/features/account/profile/utils';
import { getProducts } from '@/features/product/actions';
import { TAGS } from '../constants';

export async function getUsers({
  include,
  filter,
  sortBy,
  page,
  perPage
}: {
  include?: string;
  filter?: {
    skinType?: string;
    personalColor?: string;
    skinConcern?: string;
    scalpHairConcern?: string;
    withoutSelf?: boolean;
  };
  sortBy?: 'followers_asc' | 'followers_desc';
  page?: number;
  perPage?: number;
}) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/users', {
    params: {
      query: {
        include: include
          ? `${include},avatars,recommended_products,user_profile`
          : 'avatars,recommended_products,user_profile',
        'filter[skin_type]': filter?.skinType,
        'filter[personal_color]': filter?.personalColor,
        'filter[skin_concern]': filter?.skinConcern,
        'filter[scalp_hair_concern]': filter?.scalpHairConcern,
        'filter[without_self]': filter?.withoutSelf,
        sort_by: sortBy,
        page,
        per_page: perPage
      }
    },
    cache: 'no-cache'
  });

  if (error) {
    throw error;
  }

  const { data: users, included } = data;

  const avatars = included?.filter(isUserAvatarSchema) || [];
  const socialLinks = included?.filter(isSocialLinkSchema) || [];
  const userProfiles = included?.filter(isUserProfileSchema) || [];

  // Fetch recommended products for all users
  const allRecommendedProductIds = users?.flatMap(
    (user) => user?.relationships?.recommended_products?.data?.map((product) => product.id) ?? []
  );

  const uniqueProductIds = Array.from(new Set(allRecommendedProductIds));
  const recommendedProducts = await getProducts({
    query: {
      'filter[ids]': uniqueProductIds.join(',')
    }
  });

  const productMap = new Map(recommendedProducts.data.map((product) => [product.id, product]));

  return users?.map((user) => {
    const userAvatars = user?.relationships?.avatars?.data || [];
    const avatar =
      userAvatars.length > 0 ? avatars.find((a) => a.id === userAvatars[0].id) : undefined;

    const userProfileId = user?.relationships?.user_profile?.data?.id;
    const userProfile = userProfiles.find((profile) => profile.id === userProfileId);

    const userRecommendedProducts =
      user?.relationships?.recommended_products?.data
        ?.map((product) => productMap.get(product.id))
        .filter(Boolean) || [];

    const userSocialLinks =
      socialLinks?.filter((link) => link?.relationships?.user?.data?.id === user.id) || [];

    return {
      ...user,
      avatar: avatar
        ? {
            url: avatar.attributes?.styles?.[avatar.attributes.styles.length - 1]?.url || null
          }
        : null,
      recommendedProducts: userRecommendedProducts,
      socialLinks: userSocialLinks,
      userProfile
    };
  });
}

export async function getUserDetails(uniqueKey: string) {
  // no-cache is used to prevent the user's followers, possibly other includes, from being cached.
  const { data, error } = await apiClient.GET('/api/v2/storefront/users/{unique_key}', {
    params: {
      path: {
        unique_key: uniqueKey
      },
      query: {
        include: 'user_social_links,avatars,recommended_products,user_profile'
      }
    },
    cache: 'no-cache',
    fetch: (request) => {
      return fetch(request, { next: { tags: [TAGS.users] } });
    }
  });

  if (error) {
    throw error;
  }

  const { data: user, included } = data;

  const avatars = included?.filter(isUserAvatarSchema) || [];
  const socialLinks = included?.filter(isSocialLinkSchema) || [];
  const userProfiles = included?.filter(isUserProfileSchema) || [];

  const userAvatars = user?.relationships?.avatars?.data || [];
  const avatar =
    userAvatars.length > 0
      ? avatars.find((a: UserAvatarSchema) => a.id === userAvatars[0].id)
      : undefined;

  const allRecommendedProductIds =
    user?.relationships?.recommended_products?.data?.map((product) => product.id) || [];
  const uniqueProductIds = Array.from(new Set(allRecommendedProductIds));
  const recommendedProducts = await getProducts({
    query: {
      'filter[ids]': uniqueProductIds.join(',')
    }
  });

  const productMap = new Map(recommendedProducts.data.map((product) => [product.id, product]));

  const userRecommendedProducts =
    user?.relationships?.recommended_products?.data
      ?.map((product) => productMap.get(product.id))
      .filter(Boolean) || [];

  const userSocialLinks = socialLinks.map((link) => ({
    id: link.id,
    type: link.type,
    attributes: link.attributes
  }));

  const userProfile = userProfiles.find(
    (profile) => profile.id === user?.relationships?.user_profile?.data?.id
  );

  return {
    ...user,
    avatar: avatar
      ? {
          url: avatar.attributes?.styles?.[avatar.attributes.styles.length - 1]?.url || null
        }
      : null,
    userProfile,
    recommendedProducts: userRecommendedProducts,
    socialLinks: userSocialLinks
  };
}
