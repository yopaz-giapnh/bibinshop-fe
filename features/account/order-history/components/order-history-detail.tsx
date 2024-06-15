import { Typography } from '@/components/ui/typography';

import { Order } from '@/features/order/types';
import { OrderDetail } from '../../../order/components/order-detail';
import OrderHistoryDetailBottomButton from './order-history-detail-bottom-button';

type Props = {
  order: Order;
};

export default function OrderHistoryDetail({ order }: Props) {
  return (
    <>
      <Typography as="boldXLarge" element="p" className="mb-[24px] text-[24px] text-black-90">
        注文内容を表示
      </Typography>
      {!!order.attributes.number && (
        <OrderDetail className="h-screen-calc" orderNumber={order.attributes.number} />
      )}
      <OrderHistoryDetailBottomButton order={order} />
    </>
  );
}
