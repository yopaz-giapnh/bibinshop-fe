import { hasProperty } from '@/utils/type';
import {
  VendorBannerImage,
  VendorImage,
  VendorImageSchema,
  VendorIncludes,
  VendorSchema
} from '../types';

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

export function isVendorImageSchema(includedObject: unknown): includedObject is VendorImageSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'vendor_image';
}

export function getVendorImageUrl(image: VendorImageSchema | undefined) {
  if (!image) {
    return '/placeholder-product-image.png';
  }

  return `${image.attributes?.styles?.[image.attributes?.styles?.length - 1]?.url}`;
}

export function calculateReviewsCountPercent(count: number | undefined, total: number | undefined) {
  if (count == null || total == null || total === 0) {
    return 0;
  }

  return (count / total) * 100;
}
