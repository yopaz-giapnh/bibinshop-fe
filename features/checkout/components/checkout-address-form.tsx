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
import { ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export function CheckoutAddressForm() {
  const hasAddress = !false;

  const addressListModalRef = useRef<AddressListModalRef>(null);
  const addressFormModalRef = useRef<AddressFormModalRef>(null);
  const addressDeleteModalRef = useRef<AddressDeleteModalRef>(null);

  return (
    <div className="flex flex-col gap-4 rounded-[6px] bg-white-base p-4">
      <div className="flex justify-between">
        <Typography as="boldTitle" element="h2" className="text-text-80">
          1. お届け先住所
        </Typography>

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

      {hasAddress ? (
        <>
          <div className="w-[364px]">
            <AddressCard
              onEdit={() => {
                addressListModalRef.current?.open();
              }}
              address={{
                lastName: '山田',
                firstName: '太郎',
                lastNameKana: 'ヤマダ',
                firstNameKana: 'タロウ',
                postalCode: '123-4567',
                prefecture: '大阪府',
                city: '守口市',
                address1: '佐太東町3-101-5',
                address2: 'OOビル101',
                phoneNumber: '071-1234-5678'
              }}
            />
          </div>
          <AddressListModal
            ref={addressListModalRef}
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
    </div>
  );
}
