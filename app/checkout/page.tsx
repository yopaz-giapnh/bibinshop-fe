import { CheckoutForm } from '@/features/checkout/components/checkout-form';

export default async function Page() {
  return (
    <div className="h-full w-full bg-paleFrostBlue">
      <div className="mx-auto flex h-screen w-full flex-col items-center pt-[128px]">
        <CheckoutForm />
      </div>
    </div>
  );
}
