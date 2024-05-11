import { ProductImageIncludes, ProductIncludes } from '@/features/product/types';

export function isProductImageIncludes(
  productIncludedes: ProductIncludes
): productIncludedes is ProductImageIncludes {
  return productIncludedes.type === 'image';
}
