import Amex from '@/assets/payment/amex.svg';
import Cup from '@/assets/payment/cup.svg';
import Diners from '@/assets/payment/diners.svg';
import Discover from '@/assets/payment/discover.svg';
import Eftops from '@/assets/payment/eftops.svg';
import Jcb from '@/assets/payment/jcb.svg';
import MasterCard from '@/assets/payment/master-card.svg';
import Visa from '@/assets/payment/visa.svg';
import { hasProperty } from '@/utils/type';
import { availablePaymentMethod } from '../constants';
import {
  AvailablePaymentMethod,
  CreditCard,
  CreditCardPaymentMethod,
  KonbiniSchema,
  PaymentSchema,
  ShippmentSchema
} from '../types';

export function getCreditCardBrandIcon(creditCard: CreditCard) {
  switch (creditCard.attributes.cc_type) {
    case 'visa':
      return <Visa />;
    case 'master':
      return <MasterCard />;
    case 'amex':
      return <Amex />;
    case 'diners':
      return <Diners />;
    case 'discover':
      return <Discover />;
    case 'jcb':
      return <Jcb />;
    case 'unionpay':
      return <Cup />;
    default:
      return <Eftops />;
  }
}

export function isCreditCardSchema(includedObject: unknown): includedObject is CreditCard {
  return hasProperty(includedObject, 'type') && includedObject.type === 'credit_card';
}

export function isPaymentSchema(includedObject: unknown): includedObject is PaymentSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'payment';
}

export function isKonbiniSchema(includedObject: unknown): includedObject is KonbiniSchema {
  return (
    hasProperty(includedObject, 'type') && includedObject.type === availablePaymentMethod.konbini
  );
}

export function isShippmentSchema(includedObject: unknown): includedObject is ShippmentSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'shipment';
}

export function getDefaultCreditCard(creditCards: CreditCard[]): CreditCard {
  return creditCards.find((creditCard) => !!creditCard.attributes.default) || creditCards[0];
}

export function isCreditCardPaymentMethodType(
  paymentMethod: AvailablePaymentMethod | null
): paymentMethod is CreditCardPaymentMethod {
  return isCreditCardPaymentMethod(paymentMethod?.type);
}

export function isCreditCardPaymentMethod(paymentMethodName: string | undefined) {
  return paymentMethodName?.toLowerCase() === availablePaymentMethod.creditCard;
}

export function isPayPayPaymentMethod(paymentMethodName: string | undefined) {
  return paymentMethodName?.toLowerCase() === availablePaymentMethod.paypay;
}

export function isKonbiniPaymentMethod(paymentMethodName: string | undefined) {
  return paymentMethodName?.toLowerCase() === availablePaymentMethod.konbini;
}
