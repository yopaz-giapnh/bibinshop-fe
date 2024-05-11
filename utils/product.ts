import { components } from '@/lib/api/storefront';

export function isImageProductInclude(
  productIncludes: components['schemas']['ProductIncludes']
): productIncludes is components['schemas']['Image'] {
  return productIncludes.type === 'image';
}
