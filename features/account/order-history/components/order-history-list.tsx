'use client';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { Order } from '@/features/order/types';
import {
  getShipmentStateTitle,
  getTabValue,
  sortLineItemsByShipmentState
} from '@/features/order/utils';
import { findImageFromLineItem } from '@/features/product/utils';
import {
  TryReviewWriteModal,
  TryReviewWriteModalRef
} from '@/features/review/components/try-review-write-modal';
import { useIsPc } from '@/hooks/use-is-pc';
import { FilePen } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import OrderHistoryItem from './order-history-item';
import OrderHistoryListInfo from './order-history-list-info';
import {
  OrderReceiptConfirmModal,
  OrderReceiptConfirmModalRef
} from './order-receipt-confirm-modal';
import { OrderTrackerModal, OrderTrackerModalRef } from './order-tracker-modal';

type OrderHistoryListProps = {
  order: Order;
};

type SortedLineItems = {
  [key: string]: Order['lineItems'];
};

const STATE_PRIORITY = ['shipped', 'ready', 'pending', 'canceled', 'delivered'];

export default function OrderHistoryList({ order }: OrderHistoryListProps) {
  const isPc = useIsPc();
  const orderReceiptConfirmModalRef = useRef<OrderReceiptConfirmModalRef>(null);
  const tryReviewWriteModalRef = useRef<TryReviewWriteModalRef>(null);
  const orderTrackerModalRef = useRef<OrderTrackerModalRef>(null);
  const { variants } = order;
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleReceiptConfirm = () => {
    orderReceiptConfirmModalRef.current?.close();
    tryReviewWriteModalRef.current?.open(selectedItemId ?? '');
  };

  const handleShowShippingInfo = (trackingNumber: string) => {
    if (trackingNumber) {
      orderTrackerModalRef.current?.open(trackingNumber);
    }
  };

  const sortedLineItems = sortLineItemsByShipmentState(order);

  const extractSlugs = (items: SortedLineItems) => {
    return Object.entries(items)
      .filter(([state]) => state === 'shipped' || state === 'delivered')
      .flatMap(([, lineItems]) => lineItems.map((item) => item.attributes.slug));
  };

  const renderLineItems = (items: Order['lineItems'], state: string, isLastGroup: boolean) => (
    <div className="flex flex-col">
      <div className="relative flex w-full justify-between">
        <Typography as="boldSmall" element="p" className="mt-[16px] text-[20px]">
          {getTabValue(state)}
        </Typography>
        {isPc && (
          <div className="absolute right-0 top-[16px]">
            {state === 'shipped' && (
              <>
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => {
                    const shippedItem = sortedLineItems['shipped'][0];
                    if (shippedItem) {
                      setSelectedItemId(shippedItem.id);
                      orderReceiptConfirmModalRef.current?.open(shippedItem.id);
                    }
                  }}
                >
                  受取確認
                </Button>
                {order.shipments
                  .filter(
                    (shipment) =>
                      shipment.attributes.state === 'shipped' &&
                      shipment.attributes.tracking?.length
                  )
                  .map((shipment) => (
                    <button
                      key={shipment.id}
                      type="button"
                      className="mt-[8px] flex w-[222px] items-center justify-center rounded-[100px] border-[1px] border-bibinBlue-100 py-[8px]"
                      onClick={() => handleShowShippingInfo(shipment.attributes.tracking ?? '')}
                    >
                      <Typography
                        as="bold"
                        element="p"
                        className="ml-[8px] text-[14px] text-bibinBlue-100"
                      >
                        配送情報
                      </Typography>
                    </button>
                  ))}
              </>
            )}
            {(state === 'delivered' || state === 'shipped') && (
              <Link
                href={`/account/orders/write-review?${extractSlugs(sortedLineItems)
                  .map((slug) => `slug=${slug}`)
                  .join('&')}`}
                passHref
              >
                <button
                  type="button"
                  className="mt-[8px] flex w-[222px] items-center justify-center rounded-[100px] border-[1px] border-bibinBlue-100 py-[8px]"
                >
                  <FilePen className="h-[18px] w-[18px]" color="#51B7FF" />
                  <Typography
                    as="bold"
                    element="p"
                    className="ml-[8px] text-[14px] text-bibinBlue-100"
                  >
                    レビューを書く
                  </Typography>
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
      {items.map((item, index) => {
        const image = findImageFromLineItem({
          lineItem: item,
          variants: order.variants,
          images: order.images
        });
        const variant = variants.find(
          (variant) => variant.id === item.relationships.variant?.data?.id
        );

        return (
          <>
            <div className="flex" key={item.id}>
              <OrderHistoryItem
                item={item}
                image={image}
                status={getShipmentStateTitle(order)}
                optionsText={variant?.attributes.options_text}
                showPrice={false}
              />
            </div>
            {index === items.length - 1 && isPc && isLastGroup && <div className="border-[1px]" />}
          </>
        );
      })}
      {!isPc && (
        <>
          {state === 'shipped' && (
            <Button
              type="button"
              className="w-full"
              onClick={() => {
                const shippedItem = sortedLineItems['shipped'][0];
                if (shippedItem) {
                  setSelectedItemId(shippedItem.id);
                  orderReceiptConfirmModalRef.current?.open(shippedItem.id);
                }
              }}
            >
              受取確認
            </Button>
          )}
          {(state === 'delivered' || state === 'shipped') && (
            <div className="flex w-full justify-between pb-[8px]">
              {state === 'shipped' && (
                <>
                  {order.shipments
                    .filter(
                      (shipment) =>
                        shipment.attributes.state === 'shipped' &&
                        shipment.attributes.tracking?.length
                    )
                    .map((shipment) => (
                      <button
                        key={shipment.id}
                        type="button"
                        className="mt-[8px] w-[48%] items-center justify-center rounded-[100px] border-[1px] border-bibinBlue-100 py-[8px]"
                        onClick={() => handleShowShippingInfo(shipment.attributes.tracking ?? '')}
                      >
                        <Typography
                          as="bold"
                          element="p"
                          className="text-[14px] text-bibinBlue-100"
                        >
                          配送情報
                        </Typography>
                      </button>
                    ))}
                </>
              )}
              <Link
                href={`/account/orders/write-review?${extractSlugs(sortedLineItems)
                  .map((slug) => `slug=${slug}`)
                  .join('&')}`}
                passHref
                className={`${state === 'delivered' ? 'w-full' : ''}`}
              >
                <button
                  type="button"
                  className={`mt-[8px] flex items-center justify-center rounded-[100px] border-[1px] border-bibinBlue-100 py-[8px] ${state === 'delivered' ? 'w-full' : 'w-[155px]'}`}
                >
                  <FilePen className="h-[18px] w-[18px]" color="#51B7FF" />
                  <Typography
                    as="bold"
                    element="p"
                    className="ml-[8px] text-[14px] text-bibinBlue-100"
                  >
                    レビューを書く
                  </Typography>
                </button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <>
      <div className="mb:mt-[24px] mt-[16px] rounded-[6px] border-[1px] bg-white-base shadow-sm">
        <OrderHistoryListInfo order={order} />
        <div className="flex w-full justify-between px-[16px]">
          <div className="flex w-full flex-col ">
            {STATE_PRIORITY.map(
              (state, index) =>
                sortedLineItems[state] &&
                renderLineItems(
                  sortedLineItems[state],
                  state,
                  index === STATE_PRIORITY.filter((s) => sortedLineItems[s]).length - 1
                )
            )}
            {Object.keys(sortedLineItems)
              .filter((state) => !STATE_PRIORITY.includes(state))
              .map((state, index, array) =>
                renderLineItems(sortedLineItems[state], state, index === array.length - 1)
              )}
          </div>
        </div>
      </div>
      <OrderReceiptConfirmModal
        ref={orderReceiptConfirmModalRef}
        selectedItemId={selectedItemId}
        onConfirm={handleReceiptConfirm}
      />
      <TryReviewWriteModal ref={tryReviewWriteModalRef} sortedLineItems={sortedLineItems} />
      <OrderTrackerModal ref={orderTrackerModalRef} />
    </>
  );
}
