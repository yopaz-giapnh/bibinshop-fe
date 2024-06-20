import { components } from '@/lib/api/storefront';

export type VendorIncludes = components['schemas']['VendorIncludes'];

export type VendorImage = components['schemas']['VendorImage'];

export type VendorBannerImage = components['schemas']['VendorBannerImage'];

export type VendorSchema = components['schemas']['Vendor'];

export type VendorImageSchema = components['schemas']['VendorImage'];

export type VendorImageWithUrl = VendorImage & {
  url: string;
};

export type Vendor = VendorSchema & {
  vendorImage: VendorImageWithUrl | undefined;
  vendorBannerImage: VendorImageWithUrl | undefined;
};
