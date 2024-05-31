import { CartIncludes, LineItem, VendorTotal } from '../types';

export function isLineItemIncludes(cartIncludes: CartIncludes): cartIncludes is LineItem {
  return cartIncludes.type === 'line_item';
}

export function isVendorTotalsIncludes(cartIncludes: CartIncludes): cartIncludes is VendorTotal {
  return cartIncludes.type === 'vendor_totals';
}
