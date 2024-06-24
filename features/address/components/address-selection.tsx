import Edit from '@/assets/edit.svg';
import Trash from '@/assets/trash-blue.svg';
import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Typography } from '@/components/ui/typography';
import { Address } from '../types';

type Props = {
  addresses: Address[];
  onEdit: (values: Address) => void;
  onDelete: (values: Address) => void;
};

export function AddressSelection({ addresses, onEdit, onDelete }: Props) {
  return (
    <RadioGroup defaultValue={addresses[0].id.toString()} className="flex flex-col">
      {addresses.map((address) => (
        <div key={address.id} className="flex items-center">
          <div className="flex w-full flex-col items-center gap-2 rounded-[6px] border border-solid border-black-10 p-4 md:flex-row">
            <div className="flex items-center md:w-[calc(100%_-_194px)]">
              <RadioGroupItem value={address.id.toString()} className="mr-4" />
              <div className="flex  flex-col justify-center gap-4">
                <div className="flex-none items-center justify-center gap-4">
                  <Typography as="bold" element="p" className="text-text-90">
                    {address.attributes.lastname} {address.attributes.firstname}
                  </Typography>
                  <Typography as="caption" element="p" className="text-text-90">
                    {address.attributes.phone}
                  </Typography>
                </div>
                <div className="w-2/3">
                  <Typography as="body" element="p" className="text-text-90">
                    〒{address.attributes.zipcode}
                  </Typography>
                  <Typography as="caption" element="p" className="text-text-90">
                    {address.attributes.state_name}
                    {address.attributes.city}
                    {address.attributes.address1}
                    {address.attributes.address2}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <ButtonWithIcon
                buttonProps={{
                  className:
                    'w-[93px] h-10 flex justify-center px-2 py-4 flex-1 border border-bibinBlue-100 rounded-[100px]',
                  onClick: () => onEdit(address)
                }}
                icon={<Edit />}
                text="編集"
                textProps={{ className: 'text-bibinBlue-100' }}
              />
              <ButtonWithIcon
                buttonProps={{
                  className:
                    'w-[93px] h-10 flex justify-center px-2 py-4 flex-1 border border-bibinBlue-100 rounded-[100px]',
                  onClick: () => onDelete(address)
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
