import LoginForm from '@/features/auth/components/login-form';

export default function Page() {
  return (
    <div className="h-full w-full bg-paleFrostBlue">
      <div className="mx-auto flex h-screen w-full max-w-[472px] flex-col justify-center p-4">
        <div className="mt-4">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
