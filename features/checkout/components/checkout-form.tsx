'use client';

import { Typography } from '@/components/ui/typography';
import { AddressCard } from '@/features/address/components/address-card';
import { AddressForm } from '@/features/address/components/address-form';
import {
  AddressListModal,
  AddressListModalRef
} from '@/features/address/components/address-list-modal';
import { PaymentMethod } from '@/features/payment/components/payment-method';
import { ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { OrderOverview } from './order-overview';

export function CheckoutForm() {
  const hasAddress = !false;

  const addressListModalRef = useRef<AddressListModalRef>(null);

  return (
    <div className="flex h-full w-full flex-col">
      <Typography as="boldTitle" element="h1" className="mt-6 text-center text-text-80">
        購入手続き
      </Typography>

      <div className="mt-[22px] w-full px-20">
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="flex flex-col gap-4 rounded-[6px] bg-white-base p-4">
              <div className="flex justify-between">
                <Typography as="boldTitle" element="h2" className="text-text-80">
                  1. お届け先住所
                </Typography>

                {hasAddress && (
                  <button className="flex items-center">
                    <Typography as="linkSmall" element="h3" className="text-bibinBlue-100">
                      住所追加
                    </Typography>
                    <ChevronRight className="h-6 w-6 text-bibinBlue-100" />
                  </button>
                )}
              </div>

              {hasAddress ? (
                <>
                  <div className="w-[364px]">
                    <AddressCard
                      onEdit={() => {
                        addressListModalRef.current?.open();
                      }}
                    />
                  </div>
                  <AddressListModal ref={addressListModalRef} onAdd={() => {}} />
                </>
              ) : (
                <AddressForm />
              )}
            </div>
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
