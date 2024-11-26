import { Typography } from '@/components/ui/typography';

import { BackButton } from '@/components/button/back-button';
import { Order } from '@/features/order/types';
import { Review } from '@/features/review/types';
import { OrderDetail } from '../../../order/components/order-detail';

type Props = {
  order: Order;
  reviews: Review[];
};

export default function OrderHistoryDetail({ order, reviews }: Props) {
  return (
    <>
      <div className="mb-[16px] flex w-full items-center justify-between md:mb-[24px] md:justify-center">
        <BackButton />
        <Typography
          as="boldXLarge"
          element="p"
          className="text-[16px] text-black-90 md:text-[24px]"
        >
          注文内容を表示
        </Typography>
        <div className="h-7 w-7" />
      </div>
      {!!order.attributes.number && (
        <OrderDetail
          className="md:h-screen-calc md:px-[36px]"
          orderNumber={order.attributes.number}
          reviews={reviews}
        />
      )}
    </>
  );
}
