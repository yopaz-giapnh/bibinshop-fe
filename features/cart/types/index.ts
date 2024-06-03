import { components } from '@/lib/api/storefront';

export type CartIncludes = components['schemas']['CartIncludes'];

export type LineItem = components['schemas']['LineItem'];

export type VendorTotal = components['schemas']['VendorTotal'];

export type Cart = components['schemas']['Cart'] & {
  lineItems: LineItem[];
  vendorTotals: VendorTotal[];
};
