import MasterCard from '@/assets/payment/small-master-card.svg';
import Visa from '@/assets/payment/small-visa.svg';
import { hasProperty } from '@/utils/type';
import { CreditCard } from '../types';

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
