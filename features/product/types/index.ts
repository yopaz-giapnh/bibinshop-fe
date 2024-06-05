import { VendorData } from '@/features/vendor/types';
import { components, operations, paths } from '@/lib/api/storefront';

export type ProductSchema = components['schemas']['Product'];

export type ProductIncludes = components['schemas']['ProductIncludes'];

export type Products =
  paths['/api/v2/storefront/products']['get']['responses']['200']['content']['application/vnd.api+json'];

export type ProductsListParameters = operations['products-list']['parameters'];

export type Image = components['schemas']['Image'];

export type ProductImage = components['schemas']['Image'] & { url: string };

export type Product = ProductSchema & {
  images: ProductImage[];
  vendor?: VendorData;
};
