'use client';

import PasswordResetForm from '@/features/auth/components/password-reset-form';
import { MOBILE_SCHEME } from '@/features/auth/constants';
import { isString } from '@/utils/string';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const searchParams = useSearchParams();
  const resetPasswordToken = searchParams.get('reset_password_token');

  useEffect(() => {
    if (!isString(resetPasswordToken)) {
      window.location.href = `${MOBILE_SCHEME}//password/change`;
    }
  }, [resetPasswordToken]);

  if (!isString(resetPasswordToken)) {
    return null;
  }

  return (
    <div className="h-full w-full bg-paleFrostBlue">
      <div className="mx-auto flex h-screen w-full max-w-[472px] flex-col items-center justify-center">
        <PasswordResetForm resetPasswordToken={resetPasswordToken} />
      </div>
    </div>
  );
}
