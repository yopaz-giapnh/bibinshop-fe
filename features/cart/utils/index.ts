import { CartIncludes, CartSchema, LineItem, VendorTotal } from '../types';

export function isLineItemIncludes(cartIncludes: CartIncludes): cartIncludes is LineItem {
  return cartIncludes.type === 'line_item';
}

export function isVendorTotalsIncludes(cartIncludes: CartIncludes): cartIncludes is VendorTotal {
  return cartIncludes.type === 'vendor_totals';
}

export function displayPromoTotal(cart: CartSchema) {
  const isPromotable = !!parseInt(cart.attributes.promo_total ?? '0');

  if (!isPromotable) {
    return '';
  }

  const promoTotal = cart.attributes.display_promo_total;

  if (!promoTotal) {
    return '';
  }

  return `-${promoTotal.replace('-', '')}`;
}
