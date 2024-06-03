import { Image, ProductIncludes } from '@/features/product/types';
import { VendorData } from '@/features/vendor/types';

export function isProductImageIncludes(
  productIncludedes: ProductIncludes
): productIncludedes is Image {
  return productIncludedes.type === 'image';
}

export function isProductVendorIncludes(
  productIncludedes: ProductIncludes
): productIncludedes is VendorData {
  return productIncludedes.type === 'vendor';
}
