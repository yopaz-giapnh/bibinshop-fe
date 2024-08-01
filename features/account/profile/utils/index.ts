import { hasProperty } from '@/utils/type';
import { UserAvatarSchema, UserSex, UserSocialLinkSchema } from '../types';

export function isUserAvatarSchema(includedObject: unknown): includedObject is UserAvatarSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'user_avatar';
}

export function isUserSex(value: unknown): value is UserSex {
  return (
    typeof value === 'string' && ['male', 'female', 'not_known', 'not_applicable'].includes(value)
  );
}

export function isSocialLinkSchema(item: unknown): item is SocialLinkSchema {
  return hasProperty(item, 'type') && item.type === 'user_social_link';
}

// SocialLinkSchema の型定義を追加
export type SocialLinkSchema = UserSocialLinkSchema;
