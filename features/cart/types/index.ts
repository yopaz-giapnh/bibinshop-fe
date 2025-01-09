import { ImageSchema, VariantSchema } from '@/features/product/types';
import { VendorBannerImage, VendorImage, VendorSchema } from '@/features/vendor/types';
import { components } from '@/lib/api/storefront';
import { PaymentSchema } from './../../payment/types/index';

export type CartIncludes = components['schemas']['CartIncludes'] | VendorImage | VendorBannerImage;

export type LineItem = components['schemas']['LineItem'];

export type VendorTotal = components['schemas']['VendorTotal'];

export type CartSchema = components['schemas']['Cart'];

export type Cart = CartSchema & {
  lineItems: LineItem[];
  vendorTotals: VendorTotal[];
  variants: VariantSchema[];
  images: ImageSchema[];
  vendors: VendorSchema[];
  payments: PaymentSchema[];
};
