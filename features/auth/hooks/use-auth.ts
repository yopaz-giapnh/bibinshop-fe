import { useAccountCreation } from '@/lib/api/account/account';
import { isClientError } from '@/utils/error';
import * as auth from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

type EmailAndPasswordCredentials = {
  email: string;
  password: string;
};

export function useAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = new URLSearchParams(searchParams).get('callbackUrl') || '/';

  const signInByEmailAndPassword = async (credentials: EmailAndPasswordCredentials) => {
    const response = await auth.signIn('credentials', {
      ...credentials,
      redirect: false
    });

    if (response?.ok) {
      router.push(callbackUrl);
      router.refresh();
    } else {
      alert('TODO: ログインに失敗しました。');
    }
  };

  const accountCreation = useAccountCreation();
  const signUpByEmailAndPassword = async (credentials: EmailAndPasswordCredentials) => {
    try {
      await accountCreation.mutateAsync({
        data: {
          user: credentials
        }
      });
      await signInByEmailAndPassword(credentials);
    } catch (error) {
      if (isClientError(error)) {
        alert(error.error);
      }
      console.error(error);
    }
  };

  const signOut = async () => {
    await auth.signOut();
  };

  return {
    signInByEmailAndPassword,
    signUpByEmailAndPassword,
    signOut
  };
}
