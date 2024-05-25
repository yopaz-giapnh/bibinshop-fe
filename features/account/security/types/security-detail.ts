import { z } from 'zod';

export const formSchema = z
  .object({
    password: z.string().min(8, {
      message: 'パスワードは少なくとも8文字以上である必要があります。'
    }),
    newPassword: z.string().min(8, {
      message: '新しいパスワードは少なくとも8文字以上である必要があります。'
    }),
    newConfirmPassword: z.string().min(8, {
      message: '新しいパスワード（確認）は少なくとも8文字以上である必要があります。'
    })
  })
  .refine((data) => data.newPassword !== data.password, {
    message: '新しいパスワードは現在のパスワードと異なる必要があります。',
    path: ['newPassword']
  })
  .refine((data) => data.newPassword === data.newConfirmPassword, {
    message: '新しいパスワードと新しいパスワード（確認）が一致しません。',
    path: ['newConfirmPassword']
  });

export type FormValues = z.infer<typeof formSchema>;
