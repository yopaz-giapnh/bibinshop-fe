import { CheckoutForm } from '@/features/checkout/components/checkout-form';

export default async function Page() {
  return (
    <div className="h-full w-full bg-paleFrostBlue">
      <div className="mx-auto flex w-full flex-col items-center pb-[80px] pt-[128px]">
        <CheckoutForm />
      </div>
    </div>
  );
}
