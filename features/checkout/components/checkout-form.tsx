import { Typography } from '@/components/ui/typography';
import { getAccountAddresses } from '@/features/address/actions';
import { getAccountCreditCards } from '@/features/payment/actions';
import { PaymentMethod } from '@/features/payment/components/payment-method';
import { Suspense } from 'react';
import { CheckoutAddressForm } from './checkout-address-form';
import { CheckoutPaymentForm } from './checkout-payment-form';
import { OrderOverview } from './order-overview';

export async function CheckoutForm() {
  return (
    <div className="flex h-full w-full flex-col">
      <Typography as="boldTitle" element="h1" className="mt-6 text-center text-text-80">
        購入手続き
      </Typography>

      <div className="mt-[22px] w-full px-20">
        <div className="flex gap-6">
          <div className="flex flex-1 flex-col gap-4">
            <Suspense fallback={<div>Loading...</div>}>
              <CheckoutAddressForm getAccountAddresses={getAccountAddresses()} />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <CheckoutPaymentForm getAccountCreditCards={getAccountCreditCards()} />
            </Suspense>
          </div>
          <div className="flex w-[424px] flex-none flex-col gap-4">
            <OrderOverview />
            <PaymentMethod />
          </div>
        </div>
      </div>
    </div>
  );
}
