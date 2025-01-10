import { getCart } from '@/features/cart/actions';
import { CheckoutConfirmForm } from '@/features/checkout/components/checkout-confirm-form';
import { OrderDetailAddress } from '@/features/order/components/order-detail-address';
import { OrderDetailInfo } from '@/features/order/components/order-detail-info';
import { OrderDetailOverview } from '@/features/order/components/order-detail-overview';
import { OrderDetailPaymentMethod } from '@/features/order/components/order-detail-payment-method';
import { redirectToTop } from '@/utils/navigation';

export default async function CheckoutConfirm() {
  const cart = await getCart();

  if (!cart || cart?.attributes.state !== 'confirm') {
    return redirectToTop();
  }

  // 型がちょい複雑なので一旦分割して渡す。時間がなかった。本当は直したい
  const creditCard = cart.creditCard;

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full overflow-y-auto px-2 md:px-[272px]">
        <OrderDetailOverview item={cart} />
        <OrderDetailPaymentMethod cart={cart} creditCard={creditCard} />
        {cart.address && <OrderDetailAddress address={cart.address} />}
        <OrderDetailInfo
          lineItems={cart.lineItems}
          vendorTotals={cart.vendorTotals}
          variants={cart.variants}
          images={cart.images}
        />
      </div>
      <CheckoutConfirmForm cart={cart} />
    </div>
  );
}
