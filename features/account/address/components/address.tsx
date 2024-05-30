'use client';

import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { Typography } from '@/components/ui/typography';
import { AddressCard } from '@/features/address/components/address-card';
import {
  AddressDeleteModal,
  AddressDeleteModalRef
} from '@/features/address/components/address-delete-modal';
import {
  AddressFormModal,
  AddressFormModalRef
} from '@/features/address/components/address-form-modal';
import { CirclePlus } from 'lucide-react';
import { useRef } from 'react';
import AddressEmptyView from './address-empty-view';

export default function Address() {
  const addressFormModalRef = useRef<AddressFormModalRef>(null);
  const addressDeleteModalRef = useRef<AddressDeleteModalRef>(null);

  // TODO: 住所一覧を取得するAPIを叩く

  const addresses = [
    {
      lastName: '佐藤',
      firstName: '一郎',
      lastNameKana: 'サトウ',
      firstNameKana: 'イチロウ',
      postalCode: '234-5678',
      prefecture: '東京都',
      city: '渋谷区',
      address1: '神南1-2-3',
      address2: 'XYZマンション101',
      phoneNumber: '03-1234-5678'
    },
    {
      lastName: '鈴木',
      firstName: '二郎',
      lastNameKana: 'スズキ',
      firstNameKana: 'ジロウ',
      postalCode: '345-6789',
      prefecture: '神奈川県',
      city: '横浜市',
      address1: '西区1-2-3',
      address2: 'ABCアパート202',
      phoneNumber: '045-5678-1234'
    },
    {
      lastName: '高橋',
      firstName: '三郎',
      lastNameKana: 'タカハシ',
      firstNameKana: 'サブロウ',
      postalCode: '456-7890',
      prefecture: '大阪府',
      city: '大阪市',
      address1: '北区1-2-3',
      address2: 'DEFハイツ303',
      phoneNumber: '06-1234-5678'
    },
    {
      lastName: '田中',
      firstName: '四郎',
      lastNameKana: 'タナカ',
      firstNameKana: 'シロウ',
      postalCode: '567-8901',
      prefecture: '福岡県',
      city: '福岡市',
      address1: '中央区1-2-3',
      address2: 'GHIタワー404',
      phoneNumber: '092-5678-1234'
    }
  ];

  const hasAddress = addresses.length > 0;

  const handleEdit = (
    address:
      | {
          lastName: string;
          firstName: string;
          lastNameKana: string;
          firstNameKana: string;
          postalCode: string;
          prefecture: string;
          city: string;
          address1: string;
          phoneNumber: string;
          address2?: string | undefined;
        }
      | undefined
  ) => {
    addressFormModalRef.current?.open(address);
  };

  const handleDelete = (
    address:
      | {
          lastName: string;
          firstName: string;
          lastNameKana: string;
          firstNameKana: string;
          postalCode: string;
          prefecture: string;
          city: string;
          address1: string;
          phoneNumber: string;
          address2?: string | undefined;
        }
      | undefined
  ) => {
    addressDeleteModalRef.current?.open(address);
  };

  return (
    <>
      <Typography as="boldXLarge" element="p" className="mb-[24px] text-[24px] text-black-90">
        お届け先住所
      </Typography>
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
        <div className="mt-[24px] h-screen-calc overflow-y-auto">
          {addresses.map((address, index) => (
            <div key={index} className="mt-[24px] w-[592px]">
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
