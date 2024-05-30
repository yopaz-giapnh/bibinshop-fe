import { Typography } from '@/components/ui/typography';
import { FilePen } from 'lucide-react';
import Link from 'next/link';
import BuyAgainModal from './buy-again-modal';

type OrderHistoryActionButtonProps = {
  status: string;
};

/**
 * 注文履歴再度購入、レビューを書くボタン
 * @returns JSX.Element
 */
export default function OrderHistoryActionButton({ status }: OrderHistoryActionButtonProps) {
  const isUnpaid = status === '未払い';
  const isShipped = status === '出荷済み';

  return (
    <div className="mr-[20px] mt-[24px]">
      {/* TODO: 取得した注文履歴のidを渡して買い物カゴに追加するAPIを叩く */}
      {!isUnpaid && <BuyAgainModal />}
      {/* TODO: 取得した注文履歴のidを渡してwrite-reviewに遷移する */}
      {isShipped && (
        <Link href="/account/orders/{orderId}/write-review" passHref>
          <button
            type="button"
            className="mt-[8px] flex w-[222px] items-center justify-center rounded-[100px] border-[1px] border-bibinBlue-100 py-[8px]"
          >
            <FilePen className="h-[18px] w-[18px]" color="#51B7FF" />
            <Typography as="bold" element="p" className="ml-[8px] text-[14px] text-bibinBlue-100">
              レビューを書く
            </Typography>
          </button>
        </Link>
      )}
    </div>
  );
}
