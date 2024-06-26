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
          className="flex h-[calc(150vw-80px)] w-11/12 flex-col items-center overflow-y-auto md:h-modal-screen-calc"
        >
          <div className="w-full justify-center">
            <div className="flex w-full items-center justify-between pb-[24px]">
              <div className="h-7 w-7 md:hidden" />
              <Typography
                as="title"
                element="h2"
                className="text-center text-[16px] md:text-left md:text-[24px]"
              >
                {address ? '住所を編集する' : '新しい住所を追加する'}
              </Typography>
              <DialogClose className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
            <AddressForm address={address} onSaved={onClose} />
          </div>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
});

AddressFormModal.displayName = 'AddressFormModal';
