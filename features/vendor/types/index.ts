import { components } from '@/lib/api/storefront';

export type VendorIncludes = components['schemas']['VendorIncludes'];

export type VendorImage = components['schemas']['VendorImage'];

export type VendorBannerImage = components['schemas']['VendorBannerImage'];

export type VendorData = components['schemas']['Vendor'];

export type VendorImageWithUrl = VendorImage & {
  url: string;
};

export type Vendor = VendorData & {
  vendorImage: VendorImageWithUrl | undefined;
  vendorBannerImage: VendorImageWithUrl | undefined;
};
