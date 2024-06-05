import { hasProperty } from '@/utils/type';
import { UserSchema } from '../types';

export function isUser(included: unknown): included is UserSchema {
  return hasProperty(included, 'type') && included.type === 'user';
}
