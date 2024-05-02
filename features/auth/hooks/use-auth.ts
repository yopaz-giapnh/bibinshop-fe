import { signIn } from 'next-auth/react';
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
    const response = await signIn('credentials', {
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

  return {
    signInByEmailAndPassword
  };
}
