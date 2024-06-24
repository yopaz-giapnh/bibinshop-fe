import { Typography } from '@/components/ui/typography';
import { CartSchema } from '@/features/cart/types';
import OrderDetailSection from './order-detail-section';

type Props = {
  item: CartSchema;
};

export function OrderDetailOverview({ item }: Props) {
  return (
    <OrderDetailSection title="注文概要">
      <div className="w-full md:w-1/2">
        <div className="flex justify-between">
          <Typography as="caption" element="p" className="mt-[16px] text-[14px] text-black-90">
            {`商品金額(${item.attributes.item_count})`}
          </Typography>
          <Typography as="caption" element="p" className="mt-[16px] text-[14px] text-black-90">
            {item.attributes.display_item_total}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography as="caption" element="p" className="mt-[16px] text-[14px] text-black-90">
            送料
          </Typography>
          <Typography as="caption" element="p" className="mt-[16px] text-[14px] text-black-90">
            {item.attributes.display_ship_total}
          </Typography>
        </div>
        <div className="mt-[16px] border-t-[1px]" />
        <div className="flex items-center justify-between">
          <Typography as="caption" element="p" className="mt-[16px] text-[14px] text-black-90">
            小計
          </Typography>
          <Typography as="bold" element="p" className="mt-[16px] text-[20px] text-black-90">
            {item.attributes.display_total}
          </Typography>
        </div>
      </div>
    </OrderDetailSection>
  );
}
