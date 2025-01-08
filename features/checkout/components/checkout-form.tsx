'use client';

import { Typography } from '@/components/ui/typography';
import { getAccountAddresses } from '@/features/address/actions';
import { Cart } from '@/features/cart/types';
import { useCheckout } from '@/features/checkout/components/checkout-ctx';
import { getAccountCreditCards } from '@/features/payment/actions';
import { getAvailablePoints, getPointsRate } from '@/features/point-balance/actions';

import { useQuery } from '@tanstack/react-query';

import { PaymentMethod } from '@/features/payment/components/payment-method';

import { CheckoutUsePointForm } from './CheckoutUsePointForm';
import { CheckoutAddressForm } from './checkout-address-form';
import { CheckoutCartForm } from './checkout-cart-form';
import { CheckoutPaymentForm } from './checkout-payment-form';
import { OrderOverview } from './order-overview';

type Props = {
  cart: Cart;
};

export function CheckoutForm({ cart }: Props) {
  const { data: addresses = [] } = useQuery({
    queryKey: ['accountAddresses'],
    queryFn: () => getAccountAddresses()
  });

  const { data: creditCards = [] } = useQuery({
    queryKey: ['accountCreditCards'],
    queryFn: () => getAccountCreditCards()
  });

  const { data: availablePoints = 0 } = useQuery({
    queryKey: ['availablePoints'],
    queryFn: getAvailablePoints
  });

  const { data: pointsRate } = useQuery({
    queryKey: ['pointsRate'],
    queryFn: getPointsRate
  });

  const { activePaymentMethodId } = useCheckout();

  const hasAddress = addresses.length > 0;

  const canOrder = hasAddress && !!activePaymentMethodId;


  return (
    <div className="mt-[16px] w-full md:mt-[22px] md:px-20">
      <div className="gap-6 md:flex">
        <div className="w-full flex-1 flex-col gap-4 md:flex md:px-2">
          <div className="mt-2 flex flex-col rounded-[6px] bg-white-base p-4 md:gap-4">
            <CheckoutAddressForm addresses={addresses} />
          </div>
          <div className="mt-2 flex flex-col gap-4 rounded-[6px] bg-white-base p-4">
            <div className="flex flex-col justify-between gap-4">
              <Typography
                as="boldTitle"
                element="h2"
                className="text-[16px] text-text-100 md:text-[24px]"
              >
                2. お支払い方法
              </Typography>
              {hasAddress && <CheckoutPaymentForm creditCards={creditCards} />}
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-4 rounded-[6px] bg-white-base">
            <Typography
              as="boldTitle"
              element="h2"
              className="mb-[-18px] px-4 pt-4 text-[16px] text-text-100 md:mb-[-12px] md:text-[24px]"
            >
              3. 注文情報
            </Typography>
            <CheckoutCartForm cart={cart} />
          </div>
          <div className="mt-2 flex flex-col gap-4 rounded-[6px] bg-white-base">
            <Typography
              as="boldTitle"
              element="h2"
              className="mb-[-18px] px-4 pt-4 text-[16px] text-text-100 md:mb-[-12px] md:text-[24px]"
            >
              4. ポイント適用
            </Typography>
            {availablePoints === 0 && <div className="mb-4 h-full w-full bg-white-base" />}
            {availablePoints !== 0 && (
              <CheckoutUsePointForm
                availablePoints={availablePoints}
                maxPoint={Number(cart.attributes.total)}
              />
            )}
          </div>
        </div>
        <div className="my-2 flex w-full flex-col gap-4 md:w-[424px] md:px-2">
          <div className="w-full rounded-[6px] bg-white-base px-4 py-[19px] shadow-base">
            <Typography as="title" element="p" className="text-[16px] text-text-100 md:text-[24px]">
              注文概要
            </Typography>
            <OrderOverview cart={cart} canOrder={canOrder} pointsRate={pointsRate} />
          </div>
          <div className="hidden md:flex">
            <PaymentMethod />
          </div>
        </div>
      </div>
    </div>
  );
}
