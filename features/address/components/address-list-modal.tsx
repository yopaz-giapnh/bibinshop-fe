'use client';

import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { CirclePlus } from 'lucide-react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Address } from '../types';
import { AddressSelection } from './address-selection';

export type AddressListModalRef = {
  open: () => void;
  close: () => void;
};

type Props = {
  onAdd: () => void;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
  onValueChange: (address: Address) => void;
  activeAddress?: Address;
  addresses: Address[];
};

export const AddressListModal = forwardRef<AddressListModalRef, Props>(
  ({ onAdd, onEdit, onDelete, activeAddress, onValueChange, addresses }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false)
    }));

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="flex w-11/12 flex-col items-center justify-center gap-6">
          <Typography as="title" element="h2" className="text-[16px] md:text-[24px]">
            お届け先住所
          </Typography>

          <ButtonWithIcon
            buttonProps={{
              className:
                'w-fit md:w-[208] h-10 flex justify-center px-4 py-2 flex-1 border border-bibinBlue-100 rounded-[100px]',
              onClick: onAdd
            }}
            icon={<CirclePlus className="h-6 w-6 text-bibinBlue-100" />}
            text="新しい住所を追加する"
            textProps={{ className: 'text-bibinBlue-100' }}
          />

          <ScrollArea>
            <div className="max-h-72 md:w-[592px]">
              <AddressSelection
                activeAddress={activeAddress}
                addresses={addresses}
                onEdit={onEdit}
                onDelete={onDelete}
                onValueChange={(address) => {
                  onValueChange(address);
                  setIsOpen(false);
                }}
              />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }
);

AddressListModal.displayName = 'AddressListModal';
