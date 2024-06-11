import { Typography } from '@/components/ui/typography';
import { getOrder } from '@/features/account/order-history/actions';
import { cn } from '@/lib/utils';
import { formatDateString } from '@/utils/date';
import { getShipmentStateTitle } from '../utils';
import { OrderDetailAddress } from './order-detail-address';
import { OrderDetailInfo } from './order-detail-info';
import { OrderDetailOverview } from './order-detail-overview';
import { OrderDetailPaymentMethod } from './order-detail-payment-method';
import OrderDetailSection from './order-detail-section';

type Props = {
  className?: string;
  orderNumber: string;
};

/**
 * 注文内容共通コンポーネント
 * @returns JSX.Element
 */
export async function OrderDetail({ className, orderNumber }: Props) {
  const order = await getOrder(orderNumber);

  return (
    <>
      <div className={cn('w-5/6 overflow-y-auto', className)}>
        <OrderDetailSection title={getShipmentStateTitle(order)}>
          <Typography as="caption" element="p" className="mt-[16px] text-[16px] text-black-90">
            {`出荷日時：${formatDateString(order.shipment?.attributes.shipped_at)}`}
          </Typography>
        </OrderDetailSection>
        <OrderDetailSection title={`注文番号：${order.attributes.number}`}>
          <Typography as="caption" element="p" className="mt-[16px] text-[16px] text-black-90">
            {`注文時間：${formatDateString(order.attributes.created_at)}`}
          </Typography>
        </OrderDetailSection>
        <OrderDetailOverview item={order} />
        {order.creditCard && <OrderDetailPaymentMethod creditCard={order.creditCard} />}
        {order.address && <OrderDetailAddress address={order.address} />}
        <OrderDetailInfo lineItems={order.lineItems} vendorTotals={order.vendors} />
      </div>
    </>
  );
}
