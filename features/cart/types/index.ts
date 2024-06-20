import { ImageSchema, VariantSchema } from '@/features/product/types';
import { components } from '@/lib/api/storefront';

export type CartIncludes = components['schemas']['CartIncludes'];

export type LineItem = components['schemas']['LineItem'];

export type VendorTotal = components['schemas']['VendorTotal'];

export type CartSchema = components['schemas']['Cart'];

export type Cart = CartSchema & {
  lineItems: LineItem[];
  vendorTotals: VendorTotal[];
  variants: VariantSchema[];
  images: ImageSchema[];
};
