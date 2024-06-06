import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import BuyAgainModal from './buy-again-modal';

type OrderHistoryItemProps = {
  item: {
    image: string;
    alt: string;
    name: string;
    details: string;
  };
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
      <Image src={item.image} width={100} height={100} alt={item.alt} />
      <div className="ml-[8px] flex flex-col justify-between">
        <div>
          <Typography as="bold" element="p" className="text-[14px] text-black-90">
            {item.name}
          </Typography>
          <Typography as="small" element="p" className="mt-[4px] text-[12px] text-black-70">
            {item.details}
          </Typography>
        </div>
        {/* TODO: 取得した注文履歴のidを渡して買い物カゴに追加するAPIを叩く */}
        {!isUnpaid && <BuyAgainModal />}
      </div>
    </div>
  );
}
