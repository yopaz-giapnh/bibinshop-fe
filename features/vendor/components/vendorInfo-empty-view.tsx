import BibiVacantFace from '@/assets/bibincban/vacant-face.svg';
import { Typography } from '@/components/ui/typography';

const VendorInfoEmptyView = () => {
  return (
    <div className="mt-[24px] flex flex-col items-center justify-center">
      <BibiVacantFace />
      <Typography as="xSmall" element="p" className="mt-[24px] text-[16px] text-black-90">
        ショップ情報が設定されていません。
      </Typography>
    </div>
  );
};

export default VendorInfoEmptyView;
