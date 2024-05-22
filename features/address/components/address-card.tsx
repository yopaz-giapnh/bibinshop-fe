import Edit from '@/assets/edit.svg';
import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { Typography } from '@/components/ui/typography';

type Props = {
  onEdit?: () => void;
};

export function AddressCard({ onEdit }: Props) {
  return (
    <div className="flex w-full items-center rounded-[6px] border border-solid border-black-10 p-4">
      <div className="flex w-[calc(100%_-_93px)] flex-col justify-center gap-4">
        <div className="flex-none items-center justify-center gap-4">
          <Typography as="bold" element="p" className="text-text-90">
            山田太郎
          </Typography>
          <Typography as="caption" element="p" className="text-text-90">
            071-1234-5678
          </Typography>
        </div>
        <div className="w-2/3">
          <Typography as="body" element="p" className="text-text-90">
            〒640-0002
          </Typography>
          <Typography as="caption" element="p" className="text-text-90">
            大阪府 守口市佐太東町3-101-5 OOビル101
          </Typography>
        </div>
      </div>
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
    </div>
  );
}
