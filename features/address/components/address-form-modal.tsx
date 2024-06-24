import { Dialog, DialogClose, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { X } from 'lucide-react';
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
        <DialogContent
          hideCloseButton
          className="flex h-modal-screen-calc w-11/12 flex-col items-center gap-6 overflow-y-auto "
        >
          <div className="sticky top-0 w-full bg-white-base">
            <Typography as="title" element="h2">
              {address ? '住所を編集する' : '新しい住所を追加する'}
            </Typography>
            <DialogClose className="absolute right-6 top-2 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
          <div className="w-full">
            <AddressForm address={address} onSaved={onClose} />
          </div>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
});

AddressFormModal.displayName = 'AddressFormModal';
