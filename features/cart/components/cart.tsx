import { PaymentMethod } from '@/features/payment/components/payment-method';
import { getCart } from '../actions';
import { CartEmpty } from './cart-empty';
import { CartItemList } from './cart-item-list';
import { OrderOverview } from './order-overview';

export async function Cart() {
  const cart = await getCart();
  const isCartEmpty = !cart || cart.attributes.item_count === 0;

  return isCartEmpty ? (
    <div className="flex flex-grow items-center justify-center">
      <CartEmpty />
    </div>
  ) : (
    <div className="mt-[22px] w-full px-20">
      <div className="flex gap-6">
        <div className="flex-1">
          <CartItemList cart={cart} />
        </div>
        <div className="flex w-[424px] flex-none flex-col gap-4">
          <OrderOverview cart={cart} />

          {/* TODO: 本来は、支払い方法を取得できたほうがいい？ */}
          <PaymentMethod />
        </div>
      </div>
    </div>
  );
}
