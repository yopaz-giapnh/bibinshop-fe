import LoginForm from '@/features/auth/components/login-form';

export default async function Page() {
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
