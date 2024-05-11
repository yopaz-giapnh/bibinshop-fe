import { components, paths } from '@/lib/api/storefront';

export type ProductData = components['schemas']['Product'];

export type ProductIncludes = components['schemas']['ProductIncludes'];

export type Products =
  paths['/api/v2/storefront/products']['get']['responses']['200']['content']['application/vnd.api+json'];

export type ProductImageIncludes = components['schemas']['Image'];

export type ProductImage = components['schemas']['Image'] & { url: string };

export type Product = ProductData & {
  images: ProductImage[];
};
