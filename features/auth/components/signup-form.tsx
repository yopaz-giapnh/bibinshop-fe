'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { toast } from '@/components/ui/use-toast';
import { BadgeAlert } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticateByGoogle, signUp } from '../actions';
import { FormValues, formSchema } from '../types/email-and-password-form';
import { EmailFormField } from './email-form-field';
import { GoogleAuthButton } from './google-auth-button';
import { PasswordFormField } from './password-form-field';
import { SentEmailModal, SentEmailModalRef } from './sent-email-modal';
import { Separator } from './separator';

export default function SignupForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || undefined;

  const SentEmailModalRef = useRef<SentEmailModalRef>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur'
  });

  const email = form.watch('email');

  const [state, formAction] = useFormState(signUp, undefined);
  const signUpWithEmailAndPassword = formAction.bind(null, form.getValues());

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.success) {
      SentEmailModalRef.current?.open();
    } else {
      toast({
        title: state.message,
        className: 'bg-error',
        icon: <BadgeAlert className="h-6 w-6" />
      });
    }
  }, [state]);

  const googleAction = () => {
    authenticateByGoogle.bind(null, { callbackUrl });
  };

  return (
    <div>
      <Form {...form}>
        <div className="flex flex-col gap-4 rounded-[6px] bg-white-base p-6 md:shadow-base">
          <form action={signUpWithEmailAndPassword}>
            <Typography as="title" element="h1" className="text-center text-gray-800/80">
              新規会員登録
            </Typography>

            <div className="mb-4">
              <EmailFormField control={form.control} />
              <PasswordFormField control={form.control} />
            </div>

            <SubmitButton disabled={!form.formState.isValid} />
          </form>

          <div className="flex items-center justify-center gap-6">
            <Separator />
            <Typography as="body" element="p">
              または
            </Typography>
            <Separator />
          </div>

          <form action={googleAction}>
            <GoogleAuthButton title="Google アカウントで作成" />
          </form>

          <Typography as="caption" element="p" className="text-center text-black-base">
            次に進むことで、当社の
            <Link href={'/privacy-policy'} className="font-bold text-bibinBlue-100" passHref>
              プライバシー
            </Link>
            と
            <Link href={'/terms-of-service'} className="font-bold text-bibinBlue-100" passHref>
              利用規約
            </Link>
            に同意したものとみなされます。
          </Typography>
        </div>
      </Form>

      <div className="mt-6 flex items-center justify-center">
        <Typography as="caption" element="p" className="text-black-50">
          すでにアカウントをお持ちですか？
        </Typography>
        <Link href="/login" passHref>
          <Typography as="linkSmall" element="p" className="text-bibinBlue-100">
            サインイン
          </Typography>
        </Link>
      </div>
      <SentEmailModal ref={SentEmailModalRef} email={email} />
    </div>
  );
}

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={disabled || pending} className="w-full" size="lg" variant="lg">
      {pending ? <LoadingSpinner /> : '会員登録'}
    </Button>
  );
}
