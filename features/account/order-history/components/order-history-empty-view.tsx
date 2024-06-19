import BibiVacantFace from '@/assets/bibincban/vacant-face.svg';
import { Typography } from '@/components/ui/typography';
import { getTabValue } from '@/features/order/utils';

type OrderHistoryEmptyViewProps = {
  status: string | null;
};

/**
 * 注文履歴リストのempty view
 * @returns JSX.Element
 */
export default function OrderHistoryEmptyView({ status }: OrderHistoryEmptyViewProps) {
  const emptyMessage = status ? `${getTabValue(status)}の注文はありません` : '注文はありません';

  return (
    <div className="mt-[48px] flex flex-col items-center justify-center">
      <BibiVacantFace />
      <Typography as="small" element="p" className="mt-[24px] text-[16px] text-black-90">
        {emptyMessage}
      </Typography>
    </div>
  );
}
