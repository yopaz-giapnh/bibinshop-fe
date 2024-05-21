import { Typography } from '@/components/ui/typography';
import { CartEmpty } from './cart-empty';
import { CartItemList } from './cart-item-list';
import { OrderOverview } from './order-overview';
import { PaymentMethod } from './payment-method';

export function Cart() {
  const isCartEmpty = false;

  return (
    <div className="flex h-full w-full flex-col">
      <Typography as="boldTitle" element="h1" className="mt-6 text-center text-text-80">
        カート
      </Typography>

      {isCartEmpty ? (
        <div className="flex flex-grow items-center justify-center">
          <CartEmpty />
        </div>
      ) : (
        <div className="mt-[22px] w-full px-20">
          <div className="flex gap-6">
            <div className="flex-1">
              <CartItemList />
            </div>
            <div className="flex w-[424px] flex-none flex-col gap-4">
              <OrderOverview />
              <PaymentMethod />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
