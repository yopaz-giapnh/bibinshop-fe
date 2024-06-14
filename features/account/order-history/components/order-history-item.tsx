import { Typography } from '@/components/ui/typography';
import { LineItem } from '@/features/cart/types';
import Image from 'next/image';
import BuyAgainModal from './buy-again-modal';

type OrderHistoryItemProps = {
  item: LineItem;
  status: string;
};

/**
 * 注文履歴アイテムの詳細コンポーネント
 * @returns JSX.Element
 */
export default function OrderHistoryItem({ item, status }: OrderHistoryItemProps) {
  const isUnpaid = status === '未払い';

  return (
    <div className="flex border-b-[1px] py-[16px]">
      {/* TODO: /api/v2/storefront/account/ordersでimage取得後追加 */}
      <Image src="/item-demo.png" width={100} height={100} alt={''} />
      <div className="ml-[8px] flex flex-col justify-between">
        <div>
          <Typography as="bold" element="p" className="text-[14px] text-black-90">
            {item.attributes.name}
          </Typography>
          <Typography as="small" element="p" className="mt-[4px] text-[12px] text-black-70">
            {/* TODO: /api/v2/storefront/account/ordersでdetail取得後追加 */}
            色：vol. 6
          </Typography>
        </div>
        {!isUnpaid && <BuyAgainModal productId={item.id} />}
      </div>
    </div>
  );
}
