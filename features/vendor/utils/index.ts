import { hasProperty } from '@/utils/type';
import { VendorBannerImage, VendorImage, VendorIncludes, VendorSchema } from '../types';

export function isVendorImageIncludes(
  vendorIncludes: VendorIncludes
): vendorIncludes is VendorImage {
  return vendorIncludes.type === 'vendor_image';
}

export function isVendorBannerImageIncludes(
  vendorIncludes: VendorIncludes
): vendorIncludes is VendorBannerImage {
  return vendorIncludes.type === 'vendor_banner_image';
}

export function isVendorSchema(includedObject: unknown): includedObject is VendorSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'vendor';
}
