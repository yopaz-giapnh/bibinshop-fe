'use client';
import { MOBILE_SCHEME, REDIRECT_TO_PASSWORD_RESET_PATH } from '@/features/auth/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetPasswordToken = searchParams.get('reset_password_token');

  useEffect(() => {
    if (!resetPasswordToken) {
      router.replace('/');
      return;
    }

    window.location.href = `${MOBILE_SCHEME}${REDIRECT_TO_PASSWORD_RESET_PATH}?reset_password_token=${resetPasswordToken}`;
    router.replace('/');
  }, [resetPasswordToken, router]);

  return null;
}
