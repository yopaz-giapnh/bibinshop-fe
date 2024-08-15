import BibiVacantFace from '@/assets/bibincban/vacant-face.svg';
import { Typography } from '@/components/ui/typography';

export default async function ProfileProductEmptyView() {
  return (
    <div className="mx-[16px] mt-[24px] flex flex-col items-center justify-center">
      <BibiVacantFace />
      <Typography as="xSmall" element="p" className="mt-[24px] text-[16px] text-black-90">
        購入した商品はありません。
      </Typography>
    </div>
  );
}
