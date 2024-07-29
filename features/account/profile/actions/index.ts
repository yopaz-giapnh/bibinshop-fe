'use server';

import { apiClient } from '@/config/api-client';
import { getAccessToken } from '@/features/auth/utils/session';
import { revalidateTag } from 'next/cache';
import { TAGS } from '../constants';
import { FormValues, UserAvatarSchema } from '../types';
import { isSocialLinkSchema, isUserAvatarSchema } from '../utils';

export async function getAccount() {
  const { data, error } = await apiClient.GET('/api/v2/storefront/account', {
    params: {
      query: {
        include: 'avatars,user_social_links'
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { tags: [TAGS.account] } });
    }
  });

  if (error) {
    throw error;
  }

  const { data: account, included } = data;

  // NOTE: 複数枚可能だが、現在は1枚しかない想定
  const avatar = included?.find(isUserAvatarSchema);
  const socialLinks = included?.filter(isSocialLinkSchema);

  return {
    ...account,
    avatar: reshapeImage(avatar),
    socialLinks
  };
}

type UpdateAccountParams = FormValues;
export async function updateAccount(
  prevState: { success: boolean; message: string } | null,
  params: UpdateAccountParams
) {
  //todo: check if sending all params is correct.
  try {
    await apiClient.PATCH('/api/v2/storefront/account', {
      body: {
        user: params
      }
    });

    revalidateTag(TAGS.account);

    return {
      success: true,
      message: 'プロフィールが更新されました。'
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'プロフィールの更新に失敗しました。'
    };
  }
}

const reshapeImage = (userAvatar: UserAvatarSchema | undefined) => {
  if (!userAvatar) {
    return;
  }

  return {
    ...userAvatar,
    url: `${userAvatar.attributes?.styles?.[userAvatar.attributes?.styles?.length - 1]?.url}`
  };
};

export async function uploadAvatar(formData: FormData) {
  try {
    const file = formData.get('file');
    if (!file) {
      throw new Error('ファイルが選択されていません。');
    }
    const body = new FormData();
    body.append('avatar', file);

    // HACK: APIクライアントが正常に動作しないため、fetchを使って直接APIを呼び出す
    const accessToken = await getAccessToken();
    await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v2/storefront/account/avatars', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: 'POST',
      body
    });

    revalidateTag(TAGS.account);
  } catch (error) {
    console.error('Avatar upload failed:', error);
  }
}

// プラットフォームの型を定義
type SocialPlatform = 'INSTAGRAM' | 'FACEBOOK' | 'X';

export async function updateSocialLink(url: string, platform: SocialPlatform) {
  try {
    const { error } = await apiClient.POST('/api/v2/storefront/account/social_links', {
      body: {
        user_social_link: {
          url,
          platform
        }
      }
    });

    if (error) {
      throw error;
    }

    revalidateTag(TAGS.account);

    return {
      success: true,
      message: 'ソーシャルリンクが更新されました。'
    };
  } catch (error) {
    return {
      success: false,
      message: 'ソーシャルリンクの更新に失敗しました。'
    };
  }
}
