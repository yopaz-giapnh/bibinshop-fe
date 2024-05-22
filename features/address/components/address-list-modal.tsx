import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { CirclePlus } from 'lucide-react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { AddressSelection } from './address-selection';

export type AddressListModalRef = {
  open: () => void;
  close: () => void;
};

type Props = {
  onAdd: () => void;
};

const addresses = [
  {
    id: 1,
    name: '山田太郎',
    phone: '071-1234-5678',
    postalCode: '640-0002',
    address: '大阪府 守口市佐太東町3-101-5 OOビル101'
  },
  {
    id: 2,
    name: '山田太郎',
    phone: '071-1234-5678',
    postalCode: '640-0002',
    address: '大阪府 守口市佐太東町3-101-5 OOビル101'
  },
  {
    id: 3,
    name: '山田太郎',
    phone: '071-1234-5678',
    postalCode: '640-0002',
    address: '大阪府 守口市佐太東町3-101-5 OOビル101'
  }
];

export const AddressListModal = forwardRef<AddressListModalRef, Props>(({ onAdd }, ref) => {
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
            お届け先住所
          </Typography>

          <ButtonWithIcon
            buttonProps={{
              className:
                'w-[208] h-10 flex justify-center px-4 py-2 flex-1 border border-bibinBlue-100 rounded-[100px]',
              onClick: onAdd
            }}
            icon={<CirclePlus className="h-6 w-6 text-bibinBlue-100" />}
            text="新しい住所を追加する"
            textProps={{ className: 'text-bibinBlue-100' }}
          />

          <ScrollArea>
            <div className="max-h-[350px] w-[592px]">
              <AddressSelection addresses={addresses} onEdit={() => {}} onDelete={() => {}} />
            </div>
          </ScrollArea>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
});

AddressListModal.displayName = 'AddressListModal';
