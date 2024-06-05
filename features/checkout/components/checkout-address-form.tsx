'use client';

import { Typography } from '@/components/ui/typography';
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
import { ChevronRight } from 'lucide-react';
import { useRef } from 'react';

type Props = {
  addresses: Address[];
};

export function CheckoutAddressForm({ addresses }: Props) {
  const hasAddress = addresses.length > 0;
  const addressListModalRef = useRef<AddressListModalRef>(null);
  const addressFormModalRef = useRef<AddressFormModalRef>(null);
  const addressDeleteModalRef = useRef<AddressDeleteModalRef>(null);

  return (
    <>
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

      {hasAddress ? (
        <>
          <div className="w-[364px]">
            <AddressCard
              onEdit={() => {
                addressListModalRef.current?.open();
              }}
              address={addresses[0]}
            />
          </div>
          <AddressListModal
            ref={addressListModalRef}
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
