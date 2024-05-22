import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { FormValues } from '../types/address-form';
import { AddressCard } from './address-card';

export type AddressDeleteModalRef = {
  open: (values?: FormValues) => void;
  close: () => void;
};

export const AddressDeleteModal = forwardRef<AddressDeleteModalRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<FormValues>();

  const onOpen = (values?: FormValues) => {
    setValues(values);
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
    setTimeout(() => setValues(undefined), 200);
  };

  useImperativeHandle(ref, () => ({
    open: onOpen,
    close: onClose
  }));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription>
        <DialogContent className="flex flex-col items-center justify-center gap-6">
          <Typography as="title" element="h2">
            この住所を削除してもよろしいですか?
          </Typography>
          {values && <AddressCard address={values} />}

          <div className="flex gap-2">
            <Button
              className="w-[200px] border border-bibinBlue-100 bg-white-base"
              size="lg"
              variant="lg"
              onClick={onClose}
            >
              <Typography as="bold" element="p" className="text-bibinBlue-100">
                キャンセル
              </Typography>
            </Button>

            <Button size="lg" variant="lg" className="w-[200px]">
              削除
            </Button>
          </div>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
});

AddressDeleteModal.displayName = 'AddressDeleteModal';
