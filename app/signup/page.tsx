import SignupForm from '@/features/auth/components/signup-form';

export default async function Page() {
  return (
    <div className="h-full w-full bg-white-base md:mt-20 md:bg-paleFrostBlue">
      <div className="mx-auto mb-[24px] mt-[75px] flex w-full max-w-[472px] flex-col justify-center md:mb-0 md:h-screen">
        <div className="mt-4">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
