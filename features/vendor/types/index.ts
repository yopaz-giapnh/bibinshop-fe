import { components } from '@/lib/api/storefront';

export type VendorIncludes = components['schemas']['VendorIncludes'];

export type VendorImage = components['schemas']['VendorImage'];

export type VendorData = components['schemas']['Vendor'];

export type VendorImageWithUrl = VendorImage & {
  url: string;
};

export type Vendor = VendorData & {
  vendorImages: VendorImageWithUrl[];
};
