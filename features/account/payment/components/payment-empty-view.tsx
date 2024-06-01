import BibiVacantFace from '@/assets/bibincban/vacant-face.svg';
import { Typography } from '@/components/ui/typography';

/**
 * 支払いカード情報のempty view
 * @returns JSX.Element
 */
export default function PaymentEmptyView() {
  return (
    <div className="mt-[48px] flex flex-col items-center justify-center">
      <BibiVacantFace />
      <Typography as="small" element="p" className="mt-[24px] text-[16px] text-black-90">
        カードが登録されていません
      </Typography>
    </div>
  );
}
