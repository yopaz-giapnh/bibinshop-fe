import PasswordResetForm from '@/features/auth/components/password-reset-form';
import { redirectToTop } from '@/utils/navigation';
import { isString } from '@/utils/string';

export default async function Page({
  searchParams
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const resetPasswordToken = searchParams.reset_password_token;

  if (!isString(resetPasswordToken)) {
    return redirectToTop();
  }

  return (
    <div className="h-full w-full bg-paleFrostBlue">
      <div className="mx-auto flex h-screen w-full max-w-[472px] flex-col items-center justify-center">
        <PasswordResetForm resetPasswordToken={resetPasswordToken} />
      </div>
    </div>
  );
}
