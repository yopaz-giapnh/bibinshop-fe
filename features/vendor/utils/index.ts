import { VendorBannerImage, VendorImage, VendorIncludes } from '../types';

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
