import LoginForm from '@/features/auth/components/login-form';
import { isSignedIn } from '@/features/auth/utils/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  if (await isSignedIn()) {
    redirect('/');
  }

  return (
    <div className="h-full w-full bg-paleFrostBlue">
      <div className="mx-auto flex h-screen w-full max-w-[472px] flex-col justify-center">
        <div className="mt-4">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
