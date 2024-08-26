import { VendorSchema } from '@/features/vendor/types';
import { components, operations, paths } from '@/lib/api/storefront';

export type ProductSchema = components['schemas']['Product'];

export type ProductPropertySchema = components['schemas']['ProductProperty'];

export type TaxonSchema = components['schemas']['Taxon'];

export type VariantSchema = components['schemas']['Variant'];

export type CancellationRequestSchema = components['schemas']['OrderCancelRequest'];

export type ShippingMethodSchema = components['schemas']['ShippingMethod'];

export type ShippingMethod = ShippingMethodSchema & {
  calculator?: CalculatorSchema;
};

export type ShippingMethodIncludes = components['schemas']['ShippingMethodIncludes'];

export type CalculatorSchema = components['schemas']['Calculator'];

export type ProductIncludes = components['schemas']['ProductIncludes'];

export type Products =
  paths['/api/v2/storefront/products']['get']['responses']['200']['content']['application/vnd.api+json'];

export type ProductsListParameters = operations['products-list']['parameters'];

export type PurchaseProductsListParameters = {
  orderedUserId: string;
  page?: number;
  perPage?: number;
};

export type ImageSchema = components['schemas']['Image'];

export type ProductImage = components['schemas']['Image'] & { url: string };

export type Product = ProductSchema & {
  images: ProductImage[];
  vendor?: VendorSchema;
  taxons: TaxonSchema[];
  productProperties: ProductPropertySchema[];
  variants: VariantSchema[];
  defaultVariant?: VariantSchema;
};
