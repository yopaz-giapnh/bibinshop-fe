import { getCoupons } from '@/features/coupon/actions';
import { ApplyCouponButton } from '@/features/coupon/components/apply-coupon-button';
import { PaymentMethod } from '@/features/payment/components/payment-method';
import { getCart } from '../actions';
import { AnimatedCartContainer } from './animated-cart-container';
import { CartEmpty } from './cart-empty';
import { CartItemList } from './cart-item-list';
import { OrderOverview } from './order-overview';

export async function Cart() {
  const cart = await getCart();
  const isCartEmpty = !cart || cart.attributes.item_count === 0;

  return isCartEmpty ? (
    <div className="flex flex-grow items-center justify-center">
      <AnimatedCartContainer>
        <CartEmpty />
      </AnimatedCartContainer>
    </div>
  ) : (
    <AnimatedCartContainer>
      <div className="mt-[22px] h-full px-[8px] md:px-20">
        <div className="gap-6 md:flex">
          <div className="flex-1">
            <CartItemList cart={cart} />
          </div>
          <div className="flex flex-none flex-col gap-4 md:w-[424px]">
            <div className="hidden w-full md:block">
              <ApplyCouponButton getCoupons={getCoupons()} cartTotal={cart?.attributes.total} />
            </div>
            <OrderOverview cart={cart} getCoupons={getCoupons()} />

            {/* NOTE: 本来は、支払い方法を取得できたほうがいい？ */}
            <PaymentMethod />
          </div>
        </div>
      </div>
    </AnimatedCartContainer>
  );
}
