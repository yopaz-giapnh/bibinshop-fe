import { Address } from '@/features/address/types';
import { CartSchema, LineItem } from '@/features/cart/types';
import { CreditCard, ExtendedShipmentSchema } from '@/features/payment/types';
import { ImageSchema, ProductSchema, VariantSchema } from '@/features/product/types';
import { VendorSchema } from '@/features/vendor/types';

export type Order = CartSchema & {
  lineItems: LineItem[];
  vendors: VendorSchema[];
  address: Address | undefined;
  creditCard: CreditCard | undefined;
  shipments: ExtendedShipmentSchema[];
  variants: VariantSchema[];
  images: ImageSchema[];
  products: ProductSchema[];
};
