import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { FormValues } from '../types/address-form';
import { AddressForm } from './address-form';

export type AddressFormModalRef = {
  open: (defaultValues?: FormValues) => void;
  close: () => void;
};

export const AddressFormModal = forwardRef<AddressFormModalRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultValues, setDefaultValues] = useState<FormValues | undefined>();

  useImperativeHandle(ref, () => ({
    open: (defaultValues?: FormValues) => {
      setDefaultValues(defaultValues);
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
      setDefaultValues(undefined);
    }
  }));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription>
        <DialogContent className="flex flex-col items-center justify-center gap-6">
          <Typography as="title" element="h2">
            {defaultValues ? '住所を編集する' : '新しい住所を追加する'}
          </Typography>
          <div className="w-full">
            <AddressForm defaultValues={defaultValues} />
          </div>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
});

AddressFormModal.displayName = 'AddressFormModal';
