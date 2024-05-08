import { Image, ProductIncludes } from '@/lib/api/schema';

export function isImageProductInclude(productIncludes: ProductIncludes): productIncludes is Image {
  return productIncludes.type === 'image';
}
