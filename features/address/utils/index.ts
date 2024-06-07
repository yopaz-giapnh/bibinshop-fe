import { hasProperty } from '@/utils/type';
import { Address } from '../types';

export function isAddressSchema(includedObject: unknown): includedObject is Address {
  return hasProperty(includedObject, 'type') && includedObject.type === 'address';
}
