'use client';

import { Order } from '@/features/order/types';
import { sortLineItemsByShipment } from '@/features/order/utils';
import {
  TryReviewWriteModal,
  TryReviewWriteModalRef
} from '@/features/review/components/try-review-write-modal';
import { Review } from '@/features/review/types';
import { useRef, useState } from 'react';
import OrderHistoryListInfo from './order-history-list-info';
import OrderHistoryListItem from './order-history-list-item';
import {
  OrderReceiptConfirmModal,
  OrderReceiptConfirmModalRef
} from './order-receipt-confirm-modal';
import { OrderTrackerModal, OrderTrackerModalRef } from './order-tracker-modal';

type OrderHistoryListProps = {
  order: Order;
  reviews: Review[];
  showProductReviewButtons?: boolean;
};

export default function OrderHistoryList({
  order,
  reviews,
  showProductReviewButtons = true
}: OrderHistoryListProps) {
  const orderReceiptConfirmModalRef = useRef<OrderReceiptConfirmModalRef>(null);
  const tryReviewWriteModalRef = useRef<TryReviewWriteModalRef>(null);
  const orderTrackerModalRef = useRef<OrderTrackerModalRef>(null);
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);

  const handleReceiptConfirm = () => {
    orderReceiptConfirmModalRef.current?.close();
    tryReviewWriteModalRef.current?.open(selectedShipmentId ?? '');
  };

  const handleShowShippingInfo = (trackingNumber: string) => {
    if (trackingNumber) {
      orderTrackerModalRef.current?.open(trackingNumber);
    }
  };

  const sortedLineItems = sortLineItemsByShipment(order);

  return (
    <>
      <div className="mb:mt-[24px] mt-[16px] rounded-[6px] border-[1px] bg-white-base shadow-sm">
        <OrderHistoryListInfo order={order} />
        <div className="flex w-full justify-between px-[16px]">
          <div className="flex w-full flex-col">
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
                showKonbiniMessage
                showProductReviewButtons={showProductReviewButtons}
              />
            ))}
          </div>
        </div>
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
