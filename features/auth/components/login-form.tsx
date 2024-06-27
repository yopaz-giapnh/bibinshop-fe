'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { associateCart } from '@/features/cart/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/use-auth';
import { FormValues, formSchema } from '../types/email-and-password-form';
import { EmailFormField } from './email-form-field';
import { ForgotPasswordModal, ForgotPasswordModalRef } from './forgot-password-modal';
import { GoogleAuthButton } from './google-auth-button';
import { PasswordFormField } from './password-form-field';
import {
  PasswordReserSendLinkModal,
  PasswordReserSendLinkModalRef
} from './password-reset-send-link-modal';
import { Separator } from './separator';

export default function LoginForm() {
  const { signInByEmailAndPassword } = useAuth();
  const PasswordReserSendLinkModalRef = useRef<PasswordReserSendLinkModalRef>(null);
  const ForfgotPasswordModalRef = useRef<ForgotPasswordModalRef>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  return (
    <div>
      <div className="background bg-white-base md:hidden ">
        <div className="ml-2 mr-2 mt-6 flex items-center justify-center gap-6">
          <Separator w="1/5" />
          <Typography as="body" element="p" className="w-3/5 text-center text-sm">
            初めてbibinをご利用する方
          </Typography>
          <Separator w="1/5" />
        </div>

        <Link href="/signup" passHref className="flex justify-center">
          <Button
            type="button"
            className="mt-6 w-5/6 border border-bibinBlue-100 bg-white-base text-bibinBlue-100"
            size="lg"
            variant="lg"
          >
            bibin会員登録
          </Button>
        </Link>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async () => {
            await signInByEmailAndPassword(form.getValues());
            await associateCart();
          })}
          className="flex flex-col gap-4 rounded-[6px] bg-white-base p-6 md:shadow-base"
        >
          <Typography as="title" element="h1" className="text-center  text-gray-800/80">
            ログイン
          </Typography>

          <div>
            <EmailFormField control={form.control} />
            <PasswordFormField control={form.control} />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  ForfgotPasswordModalRef.current?.open();
                }}
                type="button"
              >
                <Typography
                  as="bold"
                  element="p"
                  className="mt-[8px] text-right text-[14px] text-bibinBlue-100"
                >
                  パスワードをお忘れですか？
                </Typography>
              </button>
            </div>
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

          <GoogleAuthButton
            onClick={() => {
              alert('TODO: Google アカウントでログイン');
            }}
            title="Google アカウントでログイン"
          />
        </form>
      </Form>

      <div className="mt-6 hidden items-center justify-center gap-6 md:flex">
        <Separator />
        <Typography as="body" element="p">
          初めてbibinをご利用する方
        </Typography>
        <Separator />
      </div>

      <Link href="/signup" passHref className="hidden md:flex">
        <Button
          type="button"
          className="mt-6 w-full border border-bibinBlue-100 bg-paleFrostBlue text-bibinBlue-100"
          size="lg"
          variant="lg"
        >
          bibinアカウントを作成する
        </Button>
      </Link>
      <ForgotPasswordModal
        handleNextModalOpen={() => {
          PasswordReserSendLinkModalRef.current?.open();
          ForfgotPasswordModalRef.current?.close();
        }}
        ref={ForfgotPasswordModalRef}
      />
      <PasswordReserSendLinkModal
        handleGoBack={() => {
          ForfgotPasswordModalRef.current?.open();
          PasswordReserSendLinkModalRef.current?.close();
        }}
        ref={PasswordReserSendLinkModalRef}
      />
    </div>
  );
}
