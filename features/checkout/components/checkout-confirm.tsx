import { getCart } from '@/features/cart/actions';
import { OrderDetailAddress } from '@/features/order/components/order-detail-address';
import { OrderDetailInfo } from '@/features/order/components/order-detail-info';
import { OrderDetailOverview } from '@/features/order/components/order-detail-overview';
import { OrderDetailPaymentMethod } from '@/features/order/components/order-detail-payment-method';
import { redirectToTop } from '@/utils/navigation';
import { CheckoutConfirmForm } from './checkout-confirm-form';

export default async function CheckoutConfirm() {
  const cart = await getCart();

  if (!cart || cart?.attributes.state !== 'confirm') {
    return redirectToTop();
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full overflow-y-auto px-2 md:px-[272px]">
        <OrderDetailOverview item={cart} />
        <OrderDetailPaymentMethod item={cart} creditCard={cart.creditCard} />
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
