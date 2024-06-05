import { Typography } from '@/components/ui/typography';
import { getAccountAddresses } from '@/features/address/actions';
import { Suspense } from 'react';
import { CheckoutAddressForm } from './checkout-address-form';

export async function CheckoutAddress() {
  return (
    <div className="flex flex-col gap-4 rounded-[6px] bg-white-base p-4">
      <div className="flex justify-between">
        <Typography as="boldTitle" element="h2" className="text-text-80">
          1. お届け先住所
        </Typography>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutAddressForm getAccountAddresses={getAccountAddresses()} />
      </Suspense>
    </div>
  );
}
