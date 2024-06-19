import { hasProperty } from '@/utils/type';
import { UserAvatarSchema, UserSex } from '../types';

export function isUserAvatarSchema(includedObject: unknown): includedObject is UserAvatarSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'user_avatar';
}

export function isUserSex(value: unknown): value is UserSex {
  return (
    typeof value === 'string' && ['male', 'female', 'not_known', 'not_applicable'].includes(value)
  );
}
