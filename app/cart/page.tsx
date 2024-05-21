import { Cart } from '@/features/cart/components/cart';

export default async function Page() {
  return (
    <div className="h-full w-full bg-paleFrostBlue">
      <div className="mx-auto flex h-screen w-full flex-col items-center pt-[128px]">
        <Cart />
      </div>
    </div>
  );
}
