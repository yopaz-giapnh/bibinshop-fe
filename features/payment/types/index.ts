import { components } from '@/lib/api/storefront';
import { z } from 'zod';
import { availablePaymentMethod, AvailablePaymentMethodType } from '../constants';

export const formSchema = z.object({
  cardHolderName: z.string().min(1, { message: '名義人を入力してください' })
});

export type AccountCreditState = {
  success: boolean;
  message: string;
  description?: string;
} | null;

export type FormValues = z.infer<typeof formSchema>;

export type CreditCard = components['schemas']['CreditCard'];

export type ShippmentSchema = components['schemas']['Shipment'];

export type PaymentSchema = components['schemas']['Payment'];

export type PaymentMethodSchema = components['schemas']['PaymentMethod'];

export type KonbiniSchema = components['schemas']['StripeKonbini'];

export type BasePaymentMethod = {
  id: string;
  type: AvailablePaymentMethodType;
};

export type CreditCardPaymentMethod = BasePaymentMethod & {
  type: typeof availablePaymentMethod.creditCard;
  creditCard: CreditCard;
};

export type PayPayPaymentMethod = BasePaymentMethod & {
  type: typeof availablePaymentMethod.paypay;
};

export type KonbiniPaymentMethod = BasePaymentMethod & {
  type: typeof availablePaymentMethod.konbini;
};

export type AvailablePaymentMethod =
  | CreditCardPaymentMethod
  | PayPayPaymentMethod
  | KonbiniPaymentMethod;
