import { components } from '@/lib/api/storefront';
import { z } from 'zod';

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
