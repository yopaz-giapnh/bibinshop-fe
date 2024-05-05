import { z } from 'zod';

export const formSchema = z.object({
  email: z.string().email({
    message: 'メールアドレスの形式が正しくありません。'
  }),
  password: z.string().min(8, {
    message: 'パスワードは少なくとも8文字以上である必要があります。'
  })
});

export type FormValues = z.infer<typeof formSchema>;
