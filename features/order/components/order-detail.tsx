'use client';

import { Typography } from '@/components/ui/typography';
import { getOrder } from '@/features/account/order-history/actions';
import OrderHistoryListItem from '@/features/account/order-history/components/order-history-list-item';
import {
  OrderReceiptConfirmModal,
  OrderReceiptConfirmModalRef
} from '@/features/account/order-history/components/order-receipt-confirm-modal';
import {
  OrderTrackerModal,
  OrderTrackerModalRef
} from '@/features/account/order-history/components/order-tracker-modal';
import {
  TryReviewWriteModal,
  TryReviewWriteModalRef
} from '@/features/review/components/try-review-write-modal';
import { Review } from '@/features/review/types';
import { cn } from '@/lib/utils';
import { formatDateString } from '@/utils/date';
import { useEffect, useRef, useState } from 'react';
import { sortLineItemsByShipment } from '../utils';
import { OrderDetailAddress } from './order-detail-address';
import { OrderDetailOverview } from './order-detail-overview';
import { OrderDetailPaymentMethod } from './order-detail-payment-method';
import OrderDetailSection from './order-detail-section';

type Props = {
  className?: string;
  orderNumber: string;
  enableCancel?: boolean;
  reviews?: Review[];
};

async function fetchOrderData(orderNumber: string) {
  const order = await getOrder(orderNumber);
  return order;
}

export function OrderDetail({ className, orderNumber, reviews }: Props) {
  const [order, setOrder] = useState<NonNullable<
    Awaited<ReturnType<typeof fetchOrderData>>
  > | null>(null);
  const orderReceiptConfirmModalRef = useRef<OrderReceiptConfirmModalRef>(null);
  const tryReviewWriteModalRef = useRef<TryReviewWriteModalRef>(null);
  const orderTrackerModalRef = useRef<OrderTrackerModalRef>(null);
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrderData(orderNumber).then((order) => {
      setOrder(order ?? null);
    });
  }, [orderNumber]);

  if (!order) {
    return null;
  }

  const handleShowShippingInfo = (trackingNumber: string) => {
    if (trackingNumber) {
      orderTrackerModalRef.current?.open(trackingNumber);
    }
  };

  const handleReceiptConfirm = () => {
    orderReceiptConfirmModalRef.current?.close();
    tryReviewWriteModalRef.current?.open(selectedShipmentId ?? '');
  };

  const sortedLineItems = sortLineItemsByShipment(order);

  return (
    <>
      <div className={cn('w-full overflow-y-auto', className)}>
        <OrderDetailSection title={`注文番号：${order.attributes.number}`}>
          <div className="flex">
            <Typography
              as="caption"
              element="p"
              className="mt-[8px] w-full text-[14px] text-black-90 md:mt-[16px] md:text-[16px]"
            >
              {`注文時間：${formatDateString(order.attributes.created_at)}`}
            </Typography>
            {/* TODO:キャンセル/返品に関する仕様決まり次第コメントイン */}
            {/* {enableCancel && <CancelOrderButton order={order} />} */}
          </div>
        </OrderDetailSection>
        <OrderDetailOverview item={order} />
        <Typography
          as="bold"
          element="p"
          className="mt-[24px] text-center text-[16px] text-black-90 md:mt-[16px] md:text-start md:text-[16px]"
        >
          注文情報
        </Typography>
        <div className="mt-[24px] w-full rounded-[6px] bg-white-base px-6 shadow-base">
          {sortedLineItems.map((group, index, array) => (
            <OrderHistoryListItem
              key={index}
              group={group}
              index={index}
              isLastGroup={index === array.length - 1}
              order={order}
              setSelectedShipmentId={setSelectedShipmentId}
              orderReceiptConfirmModalRef={orderReceiptConfirmModalRef}
              handleShowShippingInfo={handleShowShippingInfo}
              reviews={reviews}
            />
          ))}
        </div>
        <OrderDetailPaymentMethod item={order} creditCard={order.creditCard} />
        {order.address && <OrderDetailAddress address={order.address} />}
      </div>
      <OrderReceiptConfirmModal
        ref={orderReceiptConfirmModalRef}
        onConfirm={handleReceiptConfirm}
      />
      <TryReviewWriteModal
        ref={tryReviewWriteModalRef}
        sortedLineItems={sortedLineItems}
        order={order}
      />
      <OrderTrackerModal ref={orderTrackerModalRef} />
    </>
  );
}
