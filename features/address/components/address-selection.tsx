import Edit from '@/assets/edit.svg';
import Trash from '@/assets/trash-blue.svg';
import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Typography } from '@/components/ui/typography';
import { FormValues } from '../types/address-form';

type Props = {
  addresses: {
    id: number;
    name: string;
    phone: string;
    postalCode: string;
    address: string;
  }[];
  onEdit: (values: FormValues) => void;
  onDelete: (values: FormValues) => void;
};

export function AddressSelection({ addresses, onEdit, onDelete }: Props) {
  return (
    <RadioGroup defaultValue={addresses[0].id.toString()} className="flex flex-col">
      {addresses.map((address) => (
        <div key={address.id} className="flex items-center">
          <div className="flex w-full items-center rounded-[6px] border border-solid border-black-10 p-4">
            <div className="flex w-[calc(100%_-_194px)] items-center">
              <RadioGroupItem value={address.id.toString()} className="mr-4" />
              <div className="flex  flex-col justify-center gap-4">
                <div className="flex-none items-center justify-center gap-4">
                  <Typography as="bold" element="p" className="text-text-90">
                    {address.name}
                  </Typography>
                  <Typography as="caption" element="p" className="text-text-90">
                    {address.phone}
                  </Typography>
                </div>
                <div className="w-2/3">
                  <Typography as="body" element="p" className="text-text-90">
                    〒{address.postalCode}
                  </Typography>
                  <Typography as="caption" element="p" className="text-text-90">
                    {address.address}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <ButtonWithIcon
                buttonProps={{
                  className:
                    'w-[93px] h-10 flex justify-center px-2 py-4 flex-1 border border-bibinBlue-100 rounded-[100px]',
                  onClick: () => {
                    onEdit({
                      lastName: '山田',
                      firstName: '太郎',
                      lastNameKana: 'ヤマダ',
                      firstNameKana: 'タロウ',
                      postalCode: '123-4567',
                      prefecture: '大阪府',
                      city: '守口市',
                      address1: '佐太東町3-101-5',
                      address2: 'OOビル101',
                      phoneNumber: '071-1234-5678'
                    });
                  }
                }}
                icon={<Edit />}
                text="編集"
                textProps={{ className: 'text-bibinBlue-100' }}
              />
              <ButtonWithIcon
                buttonProps={{
                  className:
                    'w-[93px] h-10 flex justify-center px-2 py-4 flex-1 border border-bibinBlue-100 rounded-[100px]',
                  onClick: () => {
                    onDelete({
                      lastName: '山田',
                      firstName: '太郎',
                      lastNameKana: 'ヤマダ',
                      firstNameKana: 'タロウ',
                      postalCode: '123-4567',
                      prefecture: '大阪府',
                      city: '守口市',
                      address1: '佐太東町3-101-5',
                      address2: 'OOビル101',
                      phoneNumber: '071-1234-5678'
                    });
                  }
                }}
                icon={<Trash />}
                text="削除"
                textProps={{ className: 'text-bibinBlue-100' }}
              />
            </div>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
}
