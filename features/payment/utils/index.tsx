import MasterCard from '@/assets/payment/master-card.svg';
import Visa from '@/assets/payment/visa.svg';
import { hasProperty } from '@/utils/type';
import { CreditCard, PaymentSchema, ShippmentSchema } from '../types';

// TODO: アイコンを追加する
export function getCreditCardBrandIcon(creditCard: CreditCard) {
  switch (creditCard.attributes.cc_type) {
    case 'visa':
      return <Visa />;
    case 'mastercard':
      return <MasterCard />;
    case 'amex':
      return <MasterCard />;
    default:
      return <MasterCard />;
  }
}

export function isCreditCardSchema(includedObject: unknown): includedObject is CreditCard {
  return hasProperty(includedObject, 'type') && includedObject.type === 'credit_card';
}

export function isPaymentSchema(includedObject: unknown): includedObject is PaymentSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'payment';
}

export function isShippmentSchema(includedObject: unknown): includedObject is ShippmentSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'shipment';
}

export function getDefaultCreditCard(creditCards: CreditCard[]): CreditCard {
  return creditCards.find((creditCard) => !!creditCard.attributes.default) || creditCards[0];
}
