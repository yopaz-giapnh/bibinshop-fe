import { VendorImage, VendorIncludes } from '../types';

export function isVendorImageIncludes(
  vendorIncludes: VendorIncludes
): vendorIncludes is VendorImage {
  return vendorIncludes.type === 'vendor_image';
}
