import { Typography } from '@/components/ui/typography';
import { getAccountAddresses } from '@/features/address/actions';
import { Cart } from '@/features/cart/types';
import { getAccountCreditCards } from '@/features/payment/actions';
import { PaymentMethod } from '@/features/payment/components/payment-method';
import { CheckoutAddressForm } from './checkout-address-form';
import { CheckoutCartForm } from './checkout-cart-form';
import { CheckoutPaymentForm } from './checkout-payment-form';
import { OrderOverview } from './order-overview';

type Props = {
  cart: Cart;
};

export async function CheckoutForm({ cart }: Props) {
  const [addresses, creditCards] = await Promise.all([
    getAccountAddresses(),
    getAccountCreditCards()
  ]);
  const hasAddress = addresses.length > 0;
  const hasCreditCard = creditCards.length > 0;
  const canOrder = hasAddress && hasCreditCard;

  return (
    <div className="mt-[22px] w-full px-20">
      <div className="flex gap-6">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-4 rounded-[6px] bg-white-base p-4">
            <div className="flex justify-between">
              <Typography as="boldTitle" element="h2" className="text-text-80">
                1. お届け先住所
              </Typography>
            </div>
            <CheckoutAddressForm addresses={addresses} />
          </div>
          <div className="flex flex-col gap-4 rounded-[6px] bg-white-base p-4">
            <div className="flex flex-col justify-between gap-4">
              <Typography as="boldTitle" element="h2" className="text-text-80">
                2. お支払い方法
              </Typography>
              {hasAddress && <CheckoutPaymentForm creditCards={creditCards} />}
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-[6px] bg-white-base p-4">
            <Typography as="boldTitle" element="h2" className="text-text-80">
              3. 注文情報
            </Typography>
            {canOrder && <CheckoutCartForm cart={cart} />}
          </div>
        </div>
        <div className="flex w-[424px] flex-none flex-col gap-4">
          <div className="w-full rounded-[6px] bg-white-base px-4 py-[19px] shadow-base">
            <Typography as="title" element="p" className="text-text-100">
              注文概要
            </Typography>
            <OrderOverview cart={cart} canOrder={canOrder} />
          </div>
          <PaymentMethod />
        </div>
      </div>
    </div>
  );
}
