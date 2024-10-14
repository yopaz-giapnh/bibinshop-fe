import { CouponSchema } from '@/features/coupon/types';
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

export function displayCouponPromoTotal(cart: CartSchema, coupon: CouponSchema): string {
  if (!coupon) {
    return '';
  }

  let discountAmount: number;

  if (coupon.attributes.coupon_type === 'PERCENTAGE') {
    const preTextItemAmount = parseFloat(cart.attributes.pre_tax_item_amount || '0');
    discountAmount = Math.floor(preTextItemAmount * (coupon.attributes.amount / 100));
  } else if (coupon.attributes.coupon_type === 'FIXED') {
    discountAmount = Math.floor(coupon.attributes.amount);
  } else {
    return '';
  }

  return `-${convertNumberToCurrency(discountAmount)}`;
}

export function couponPromoTotalAmount(cart: CartSchema, coupon: CouponSchema): number {
  let discountAmount: number;

  if (coupon.attributes.coupon_type === 'PERCENTAGE') {
    const preTextItemAmount = parseFloat(cart.attributes.pre_tax_item_amount || '0');
    discountAmount = Math.floor(preTextItemAmount * (coupon.attributes.amount / 100));
  } else if (coupon.attributes.coupon_type === 'FIXED') {
    discountAmount = Math.floor(coupon.attributes.amount);
  } else {
    return 0;
  }

  return discountAmount;
}

// HACK: 本来はこっちで計算したくないが、現状の実装だとここで計算するしかない
export function displayTotal(
  cart: CartSchema,
  coupon?: CouponSchema | null,
  appliedPoints?: string | null
): string {
  let total = convertCurrencyToNumber(cart.attributes.display_total || '0円');
  // クーポン金額を差し引く
  if (coupon) {
    total -= couponPromoTotalAmount(cart, coupon);
  }
  // ポイントを差し引く
  if (appliedPoints) {
    total -= Number(appliedPoints);
  }

  return convertNumberToCurrency(total) || '0円';
}

export function subtotalAfterCouponAmount(cart: CartSchema, coupon?: CouponSchema | null): number {
  let total = convertCurrencyToNumber(cart.attributes.display_total || '0円');
  // クーポン金額を差し引く
  if (coupon) {
    total -= couponPromoTotalAmount(cart, coupon);
  }
  return total | 0;
}

export function convertCurrencyToNumber(currencyString: string): number {
  // 通貨記号と桁区切りのカンマを取り除く
  const cleanedString = currencyString.replace(/[^\d.-]/g, '');

  // 文字列を数値に変換
  const number = parseFloat(cleanedString);

  // 数値に変換できない場合は NaN を返す
  if (isNaN(number)) {
    console.error(`Invalid currency string: ${currencyString}`);
    return 0;
  }

  return number;
}

export function convertNumberToCurrency(number: number, currency: string = '円'): string {
  // 数値が有効かチェック
  if (isNaN(number) || !isFinite(number)) {
    console.error(`Invalid number: ${number}`);
    return 'Invalid';
  }

  // 数値を整数に丸める（小数点以下を切り捨て）
  const roundedNumber = Math.floor(number);

  // 3桁ごとにカンマを挿入
  const formattedNumber = roundedNumber.toLocaleString('ja-JP');

  // 通貨記号を追加
  return `${formattedNumber}${currency}`;
}
