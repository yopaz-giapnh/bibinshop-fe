import BibiVacantFace from '@/assets/bibincban/vacant-face.svg';
import { Typography } from '@/components/ui/typography';

/**
 * ベンダーレビュー empty view
 * @returns JSX.Element
 */
export default function VendorReviewEmptyView() {
  return (
    <div className="mt-[24px] flex flex-col items-center justify-center">
      <BibiVacantFace />
      <Typography as="xSmall" element="p" className="mt-[24px] text-[16px] text-black-90">
        レビューはありません。
      </Typography>
    </div>
  );
}
