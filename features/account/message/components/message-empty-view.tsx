import BibiBubbleMessage from '@/assets/bibincban/bubble-message.svg';
import { Typography } from '@/components/ui/typography';

/**
 * メッセージがない場合の表示コンポーネント
 * @returns JSX.Element
 */
export default function MessageEmptyView() {
  return (
    <div className="mt-[24px] flex flex-col items-center justify-center">
      <BibiBubbleMessage />
      <Typography as="xSmall" element="p" className="mt-[24px] text-[16px] text-black-90">
        メッセージはありません。
      </Typography>
    </div>
  );
}
