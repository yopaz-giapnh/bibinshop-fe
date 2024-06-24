import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { removeAccountAddress } from '../actions';
import { Address } from '../types';
import { AddressCard } from './address-card';

export type AddressDeleteModalRef = {
  open: (values?: Address) => void;
  close: () => void;
};

export const AddressDeleteModal = forwardRef<AddressDeleteModalRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<Address>();

  const onOpen = (values?: Address) => {
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

  const [message, formAction] = useFormState(removeAccountAddress, null);
  const action = formAction.bind(null, values?.id || '');

  useEffect(() => {
    if (message && message.success) {
      onClose();
    }
  }, [message]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription>
        <DialogContent className="flex w-11/12 flex-col items-center justify-center gap-6">
          <Typography as="title" element="h2" className="text-center">
            この住所を削除してもよろしいですか?
          </Typography>
          {values && <AddressCard address={values} />}

          <div className="flex gap-2">
            <Button
              className="w-[150px] border border-bibinBlue-100 bg-white-base md:w-[200px]"
              size="lg"
              variant="lg"
              onClick={onClose}
              type="button"
            >
              <Typography as="bold" element="p" className="text-bibinBlue-100">
                キャンセル
              </Typography>
            </Button>
            <form action={action}>
              <DeleteButton />
            </form>
          </div>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
});

AddressDeleteModal.displayName = 'AddressDeleteModal';

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button size="lg" variant="lg" className="w-[150px] md:w-[200px]" disabled={pending}>
      {pending ? <LoadingSpinner /> : '削除'}
    </Button>
  );
}
