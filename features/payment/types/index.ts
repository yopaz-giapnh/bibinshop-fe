import { components } from '@/lib/api/storefront';
import { z } from 'zod';

export const formSchema = z.object({
  cardHolderName: z.string().min(1, { message: '名義人を入力してください' })
});

export type FormValues = z.infer<typeof formSchema>;

export type CreditCard = components['schemas']['CreditCard'];
