'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { GoogleLogo } from '@/components/icons/google-logo';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';
import { useAuth } from '../hooks/use-auth';

const formSchema = z.object({
  email: z.string().email({
    message: 'メールアドレスの形式が正しくありません。'
  }),
  password: z.string().min(8, {
    message: 'パスワードは少なくとも8文字以上である必要があります。'
  })
});

export default function LoginForm() {
  const { signInByEmailAndPassword } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(signInByEmailAndPassword)}
          className="flex flex-col gap-4 rounded-[6px] bg-white-base p-6 shadow-base"
        >
          <Typography as="title" element="h1" className="text-center">
            ログイン
          </Typography>

          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メールアドレス</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>パスワード</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Link href="/auth/forgot-password">
              <Typography as="linkSmall" element="p" className="mt-2 text-right text-bibinBlue-100">
                パスワードをお忘れですか？
              </Typography>
            </Link>
          </div>

          <Button
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            className="w-full"
            size="lg"
            variant="lg"
          >
            {form.formState.isSubmitting ? <LoadingSpinner /> : 'ログイン'}
          </Button>

          <div className="flex items-center justify-center gap-6">
            <Separator />
            <Typography as="body" element="p">
              または
            </Typography>
            <Separator />
          </div>

          <Button
            type="submit"
            className="w-full border border-black-20 bg-white-base"
            size="lg"
            variant="lg"
          >
            <div className="flex items-center justify-center gap-4">
              <GoogleLogo />
              <Typography as="body" element="p" className="text-black-80">
                Google アカウントでログイン
              </Typography>
            </div>
          </Button>
        </form>
      </Form>

      <div className="mt-6 flex items-center justify-center gap-6">
        <Separator />
        <Typography as="body" element="p">
          初めてbibinをご利用する方
        </Typography>
        <Separator />
      </div>

      <Button
        type="submit"
        className="mt-6 w-full border border-bibinBlue-100 bg-paleFrostBlue text-bibinBlue-100"
        size="lg"
        variant="lg"
      >
        bibinアカウントを作成する
      </Button>
    </div>
  );
}

function Separator() {
  return <div className="h-[1px] w-[99px] bg-black-10" />;
}
