'use client';

import { Typography } from '@/components/ui/typography';
import { toast } from '@/components/ui/use-toast';
import { AddressCard } from '@/features/address/components/address-card';
import {
  AddressDeleteModal,
  AddressDeleteModalRef
} from '@/features/address/components/address-delete-modal';
import { AddressForm } from '@/features/address/components/address-form';
import {
  AddressFormModal,
  AddressFormModalRef
} from '@/features/address/components/address-form-modal';
import {
  AddressListModal,
  AddressListModalRef
} from '@/features/address/components/address-list-modal';
import { Address } from '@/features/address/types';
import { getDefaultAddress } from '@/features/address/utils';
import { Check, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useCheckout } from './checkout-ctx';

type Props = {
  addresses: Address[];
};

export function CheckoutAddressForm({ addresses }: Props) {
  const { setActiveAddress, activeAddress } = useCheckout();
  const hasAddress = addresses.length > 0;
  const addressListModalRef = useRef<AddressListModalRef>(null);
  const addressFormModalRef = useRef<AddressFormModalRef>(null);
  const addressDeleteModalRef = useRef<AddressDeleteModalRef>(null);
  const defaultAddress = getDefaultAddress(addresses);

  useEffect(() => {
    if (defaultAddress) {
      setActiveAddress(defaultAddress);
    }
  }, [defaultAddress, setActiveAddress]);

  return (
    <>
      <div className="mb-2 flex justify-between ">
        {hasAddress && (
          <button
            className="flex items-center"
            onClick={() => {
              addressFormModalRef.current?.open();
            }}
          >
            <Typography as="linkSmall" element="h3" className="text-bibinBlue-100">
              住所追加
            </Typography>
            <ChevronRight className="h-6 w-6 text-bibinBlue-100" />
          </button>
        )}
      </div>

      {hasAddress && activeAddress ? (
        <>
          <div className="w-full md:w-[364px]">
            <AddressCard
              onEdit={() => {
                addressListModalRef.current?.open();
              }}
              address={activeAddress}
            />
          </div>
          <AddressListModal
            ref={addressListModalRef}
            activeAddress={activeAddress}
            addresses={addresses}
            onAdd={() => {
              addressFormModalRef.current?.open();
            }}
            onEdit={(values) => {
              addressFormModalRef.current?.open(values);
            }}
            onDelete={(values) => {
              addressDeleteModalRef.current?.open(values);
            }}
            onValueChange={(address) => {
              setActiveAddress(address);
              toast({
                title: '住所が変更されました。',
                icon: <Check className="h-6 w-6" />
              });
            }}
          />
          <AddressFormModal ref={addressFormModalRef} />
          <AddressDeleteModal ref={addressDeleteModalRef} />
        </>
      ) : (
        <AddressForm buttonText="住所を保存する" />
      )}
    </>
  );
}
