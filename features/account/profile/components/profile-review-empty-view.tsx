import DocumentBlue from '@/assets/document_blue.svg';
import { Typography } from '@/components/ui/typography';

/**
 * ユーザープロフィールレビュー empty view
 * @returns JSX.Element
 */
export default function ProfileReviewEmptyView() {
  return (
    <div className="mt-[24px] flex flex-col items-center justify-center">
      <DocumentBlue />
      <Typography as="xSmall" element="p" className="mt-[24px] text-[16px] text-black-90">
        レビューはありません。
      </Typography>
    </div>
  );
}
