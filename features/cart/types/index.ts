import { components } from '@/lib/api/storefront';

export type CartIncludes = components['schemas']['CartIncludes'];

export type LineItem = components['schemas']['LineItem'];

// TODO: api定義する
export type VendorTotal = {
  id: string;
  type: string;
  attributes: {
    name?: string;
  };
};

export type Cart = components['schemas']['Cart'] & {
  lineItems: LineItem[];
  vendorTotals: VendorTotal[];
};
