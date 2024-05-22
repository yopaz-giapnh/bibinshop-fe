import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { AddressForm } from './address-form';

export type AddressFormModalRef = {
  open: () => void;
  close: () => void;
};

export const AddressFormModal = forwardRef<AddressFormModalRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription>
        <DialogContent className="flex flex-col items-center justify-center gap-6">
          <Typography as="title" element="h2">
            新しい住所を追加する
          </Typography>
          <div className="w-full">
            <AddressForm />
          </div>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
});

AddressFormModal.displayName = 'AddressFormModal';
