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
    <div className="mt-[16px] flex w-full items-center rounded-[6px] border border-solid border-black-10 bg-white-base p-4 shadow-base md:mt-0">
      <div className="flex w-full flex-col justify-center gap-4 md:w-[calc(100%_-_93px)]">
        <div className="flex w-full flex-none gap-4 md:flex-col">
          <Typography as="bold" element="p" className="text-text-90 text-[16px] md:text-[20px]">
            {attributes.lastname} {attributes.firstname}
          </Typography>
          <Typography as="caption" element="p" className="text-text-90 text-[14px] md:text-[16px]">
            {attributes.phone}
          </Typography>
        </div>
        <div className="w-2/3">
          <Typography as="body" element="p" className="text-text-90 text-[14px] md:text-[16px]">
            〒{attributes.zipcode}
          </Typography>
          <Typography as="caption" element="p" className="text-text-90 text-[14px] md:text-[16px]">
            {attributes.state_name} {attributes.city} {attributes.address1} {attributes.address2}
          </Typography>
        </div>
        <div className="flex w-2/3 md:hidden">
          {onEdit && (
            <ButtonWithIcon
              buttonProps={{
                className:
                  'h-10 flex justify-center px-2 py-4 flex-1 border border-bibinBlue-100 rounded-[100px]',
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
                  'ml-[8px] h-10 flex justify-center px-2 py-4 flex-1 border border-bibinBlue-100 rounded-[100px]',
                onClick: onDelete
              }}
              icon={<Trash />}
              text="削除"
              textProps={{ className: 'text-bibinBlue-100' }}
            />
          )}
        </div>
      </div>
      <div className="hidden w-2/3 md:flex">
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
                'w-[93px] ml-[8px] h-10 flex justify-center px-2 py-4 flex-1 border border-bibinBlue-100 rounded-[100px] hidden md:flex',
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
