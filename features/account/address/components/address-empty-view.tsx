import BibiBubbleAddress from '@/assets/bibincban/bubble-address.svg';
import { Typography } from '@/components/ui/typography';

export default function AddressEmptyView() {
  return (
    <div className="mt-[24px] flex flex-col items-center justify-center">
      <BibiBubbleAddress />
      <Typography as="xSmall" element="p" className="mt-[24px] text-[16px] text-black-90">
        お届け先の住所が登録されていません。
      </Typography>
    </div>
  );
}
