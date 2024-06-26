import { components } from '@/lib/api/storefront';
import { FormValues } from './address-form';

export type Address = components['schemas']['Address'];

export type AddressFormData = FormValues & {
  id?: string;
  isDefaultAddress: boolean;
};

export type AddressState = {
  success: boolean;
  message: string;
  description?: string;
} | null;

export type SearchAddressByPostcodeResponse = {
  prefecture: string;
  city: string;
  suburb: string;
  error?: string;
};
