import { z } from 'zod';

export const formSchema = z
  .object({
    password: z.string().min(8, {
      message: 'パスワードは少なくとも8文字以上である必要があります。'
    }),
    confirmPassword: z.string().min(8, {
      message: '新しいパスワードは少なくとも8文字以上である必要があります。'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードと確認用パスワードが一致していません。',
    path: ['confirmPassword']
  });

export type FormValues = z.infer<typeof formSchema>;
