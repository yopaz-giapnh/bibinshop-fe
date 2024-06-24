import Edit from '@/assets/edit.svg';
import Trash from '@/assets/trash-blue.svg';
import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { Typography } from '@/components/ui/typography';
import { Address } from '../types';

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
  address: Address;
};

export function AddressCard({ onEdit, onDelete, address }: Props) {
  const { attributes } = address;

  return (
    <div className="flex w-full items-center rounded-[6px] border border-solid border-black-10 bg-white-base p-4 shadow-base">
      <div className="flex w-[calc(100%_-_93px)] flex-col justify-center gap-4">
        <div className="flex-none items-center justify-center gap-4">
          <Typography as="bold" element="p" className="text-text-90">
            {attributes.lastname} {attributes.firstname}
          </Typography>
          <Typography as="caption" element="p" className="text-text-90">
            {attributes.phone}
          </Typography>
        </div>
        <div className="w-2/3">
          <Typography as="body" element="p" className="text-text-90">
            〒{attributes.zipcode}
          </Typography>
          <Typography as="caption" element="p" className="text-text-90">
            {attributes.state_name} {attributes.city} {attributes.address1} {attributes.address2}
          </Typography>
        </div>
      </div>
      <div className="flex">
        {onEdit && (
          <ButtonWithIcon
            buttonProps={{
              className:
                'w-[93px] h-10 flex justify-center px-2 py-4 flex-1 border border-bibinBlue-100 rounded-[100px]',
              onClick: onEdit
            }}
            icon={<Edit />}
            text="編集"
            textProps={{ className: 'text-bibinBlue-100' }}
          />
        )}
        {onDelete && (
          <ButtonWithIcon
            buttonProps={{
              className:
                'w-[93px] ml-[8px] h-10 flex justify-center px-2 py-4 flex-1 border border-bibinBlue-100 rounded-[100px]',
              onClick: onDelete
            }}
            icon={<Trash />}
            text="削除"
            textProps={{ className: 'text-bibinBlue-100' }}
          />
        )}
      </div>
    </div>
  );
}
