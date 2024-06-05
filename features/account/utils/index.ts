import { hasProperty } from '@/utils/type';
import { User } from '../types';

export function isUser(included: unknown): included is User {
  return hasProperty(included, 'type') && included.type === 'user';
}
