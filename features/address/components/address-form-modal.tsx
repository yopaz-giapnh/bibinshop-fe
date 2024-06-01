import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Address } from '../types';
import { AddressForm } from './address-form';

export type AddressFormModalRef = {
  open: (defaultValues?: Address) => void;
  close: () => void;
};

export const AddressFormModal = forwardRef<AddressFormModalRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState<Address | undefined>();

  const onOpen = (address?: Address) => {
    setAddress(address);
    setIsOpen(true);
  };

  const onClose = () => {
    setAddress(undefined);
    setIsOpen(false);
  };

  useImperativeHandle(ref, () => ({
    open: onOpen,
    close: onClose
  }));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription>
        <DialogContent className="flex h-modal-screen-calc flex-col items-center gap-6 overflow-y-auto ">
          <Typography as="title" element="h2">
            {address ? '住所を編集する' : '新しい住所を追加する'}
          </Typography>
          <div className="w-full">
            <AddressForm address={address} onSaved={onClose} />
          </div>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
});

AddressFormModal.displayName = 'AddressFormModal';
