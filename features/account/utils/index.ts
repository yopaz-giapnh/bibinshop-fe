import { hasProperty } from '@/utils/type';
import { UserSchema } from '../types';

export function isUserSchema(includedObject: unknown): includedObject is UserSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'user';
}
