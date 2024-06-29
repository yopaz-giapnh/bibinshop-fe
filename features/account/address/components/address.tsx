'use client';

import { BackButton } from '@/components/button/back-button';
import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { Typography } from '@/components/ui/typography';
import { getAccountAddresses } from '@/features/address/actions';
import { AddressCard } from '@/features/address/components/address-card';
import {
  AddressDeleteModal,
  AddressDeleteModalRef
} from '@/features/address/components/address-delete-modal';
import {
  AddressFormModal,
  AddressFormModalRef
} from '@/features/address/components/address-form-modal';
import { Address as AddressType } from '@/features/address/types';
import { CirclePlus } from 'lucide-react';
import { use, useRef } from 'react';
import AddressEmptyView from './address-empty-view';

type Props = {
  getAccountAddresses: ReturnType<typeof getAccountAddresses>;
};

export default function Address({ getAccountAddresses }: Props) {
  const addresses = use(getAccountAddresses);
  const hasAddress = addresses.length > 0;

  const addressFormModalRef = useRef<AddressFormModalRef>(null);
  const addressDeleteModalRef = useRef<AddressDeleteModalRef>(null);

  const handleEdit = (address: AddressType) => {
    addressFormModalRef.current?.open(address);
  };

  const handleDelete = (address: AddressType) => {
    addressDeleteModalRef.current?.open(address);
  };

  return (
    <>
      <div className="mb-[24px] flex w-full items-center justify-between md:justify-center">
        <BackButton />
        <Typography
          as="boldXLarge"
          element="p"
          className="text-[16px] text-black-90 md:text-[24px]"
        >
          お届け先住所
        </Typography>
        <div className="h-7 w-7" />
      </div>
      <ButtonWithIcon
        buttonProps={{
          className:
            'h-[20px] flex justify-center px-6 py-5 border border-bibinBlue-100 rounded-[100px]',
          onClick: () => {
            addressFormModalRef.current?.open();
          }
        }}
        icon={<CirclePlus className="h-6 w-6 text-bibinBlue-100" />}
        text="新しい住所を追加する"
        textProps={{ className: 'text-bibinBlue-100' }}
      />
      {hasAddress ? (
        <div className="w-full overflow-y-auto md:mt-[24px] md:w-[592px]">
          {addresses.map((address) => (
            <div key={address.id} className="mt-[24px]">
              <AddressCard
                onEdit={() => handleEdit(address)}
                onDelete={() => handleDelete(address)}
                address={address}
              />
            </div>
          ))}
        </div>
      ) : (
        <AddressEmptyView />
      )}
      <AddressFormModal ref={addressFormModalRef} />
      <AddressDeleteModal ref={addressDeleteModalRef} />
    </>
  );
}
