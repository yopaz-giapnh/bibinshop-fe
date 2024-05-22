import { z } from 'zod';

export const formSchema = z.object({
  lastName: z.string().min(1, '姓は必須項目です'),
  firstName: z.string().min(1, '名は必須項目です'),
  lastNameKana: z
    .string()
    .regex(/^[ァ-ヶー]*$/, '姓（カタカナ）はカタカナで入力してください')
    .min(1, '姓（カタカナ）は必須項目です'),
  firstNameKana: z
    .string()
    .regex(/^[ァ-ヶー]*$/, '名（カタカナ）はカタカナで入力してください')
    .min(1, '名（カタカナ）は必須項目です'),
  postalCode: z.string().regex(/^\d{3}-\d{4}$/, '郵便番号は xxx-xxxx の形式で入力してください'),
  prefecture: z.string().min(1, '都道府県は必須項目です'),
  city: z.string().min(1, '市区町村は必須項目です'),
  address1: z.string().min(1, '番地は必須項目です'),
  address2: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{2,4}-\d{2,4}-\d{4}$/, '電話番号は xx-xxxx-xxxx の形式で入力してください')
});

export type FormValues = z.infer<typeof formSchema>;
