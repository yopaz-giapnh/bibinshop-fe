import { ShippmentSchema } from '@/features/payment/types';
import { hasProperty } from '@/utils/type';
import { Address } from '../types';

export function isAddressSchema(includedObject: unknown): includedObject is Address {
  return hasProperty(includedObject, 'type') && includedObject.type === 'address';
}

export function isShippmentSchema(includedObject: unknown): includedObject is ShippmentSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'shipment';
}

export function getDefaultAddress(addresses: Address[]): Address {
  return addresses.find((address) => !!address.attributes.is_default) || addresses[0];
}
