import { z } from 'zod';

export const formSchema = z.object({
  email: z.string().email({
    message: 'メールアドレスを正しい形式で入力してください。'
  })
});

export type FormValues = z.infer<typeof formSchema>;
