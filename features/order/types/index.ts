import { Address } from '@/features/address/types';
import { CartSchema, LineItem } from '@/features/cart/types';
import { CreditCard, ShippmentSchema } from '@/features/payment/types';
import { VariantSchema } from '@/features/product/types';
import { VendorSchema } from '@/features/vendor/types';

export type Order = CartSchema & {
  lineItems: LineItem[];
  vendors: VendorSchema[];
  address: Address | undefined;
  creditCard: CreditCard | undefined;
  shipment: ShippmentSchema | undefined;
  variants: VariantSchema[];
};
