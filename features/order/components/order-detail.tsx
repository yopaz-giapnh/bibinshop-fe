'use client';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { getOrder } from '@/features/account/order-history/actions';
import OrderHistoryItem from '@/features/account/order-history/components/order-history-item';
import {
  OrderReceiptConfirmModal,
  OrderReceiptConfirmModalRef
} from '@/features/account/order-history/components/order-receipt-confirm-modal';
import {
  OrderTrackerModal,
  OrderTrackerModalRef
} from '@/features/account/order-history/components/order-tracker-modal';
import { findImageFromLineItem } from '@/features/product/utils';
import {
  TryReviewWriteModal,
  TryReviewWriteModalRef
} from '@/features/review/components/try-review-write-modal';
import { useIsPc } from '@/hooks/use-is-pc';
import { cn } from '@/lib/utils';
import { formatDateString } from '@/utils/date';
import { FilePen } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Order } from '../types';
import { getShipmentStateTitle, getTabValue, sortLineItemsByShipmentState } from '../utils';
import { OrderDetailAddress } from './order-detail-address';
import { OrderDetailOverview } from './order-detail-overview';
import { OrderDetailPaymentMethod } from './order-detail-payment-method';
import OrderDetailSection from './order-detail-section';

type Props = {
  className?: string;
  orderNumber: string;
};

type SortedLineItems = {
  [key: string]: Order['lineItems'];
};

const STATE_PRIORITY = ['shipped', 'ready', 'pending', 'canceled', 'delivered'];

async function fetchOrderData(orderNumber: string) {
  const order = await getOrder(orderNumber);
  return order;
}

declare global {
  interface Window {
    Ordertracker: (config: { id: string; trackingNumber?: string }) => {
      render: (selector: string) => void;
    };
  }
}

/**
 * 注文内容共通コンポーネント
 * @returns JSX.Element
 */
export function OrderDetail({ className, orderNumber }: Props) {
  const isPc = useIsPc();
  const [order, setOrder] = useState<Order | null>(null);
  const orderReceiptConfirmModalRef = useRef<OrderReceiptConfirmModalRef>(null);
  const tryReviewWriteModalRef = useRef<TryReviewWriteModalRef>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const orderTrackerModalRef = useRef<OrderTrackerModalRef>(null);

  useEffect(() => {
    fetchOrderData(orderNumber).then((order) => {
      setOrder(order ?? null);
    });
  }, [orderNumber]);

  if (!order) {
    return;
  }

  const handleShowShippingInfo = (trackingNumber: string) => {
    if (trackingNumber) {
      orderTrackerModalRef.current?.open(trackingNumber);
    }
  };

  const handleReceiptConfirm = () => {
    orderReceiptConfirmModalRef.current?.close();
    tryReviewWriteModalRef.current?.open(selectedItemId ?? '');
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
        <Typography as="boldSmall" element="p" className="text-[20px]">
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
        const variant = order?.variants.find(
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
                showBuyAgain={false}
              />
            </div>
            {index === items.length - 1 && isLastGroup && isPc && (
              <div className="mb-[8px] border-b-[1px]" />
            )}
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
      <div className={cn('w-full overflow-y-auto', className)}>
        <OrderDetailSection title={`注文番号：${order.attributes.number}`}>
          <Typography
            as="caption"
            element="p"
            className="mt-[8px] text-[14px] text-black-90 md:mt-[16px] md:text-[16px]"
          >
            {`注文時間：${formatDateString(order.attributes.created_at)}`}
          </Typography>
        </OrderDetailSection>
        <OrderDetailOverview item={order} />
        <Typography
          as="bold"
          element="p"
          className="mt-[24px] text-center text-[16px] text-black-90 md:mt-[16px] md:text-start md:text-[16px]"
        >
          注文情報
        </Typography>
        <div className="mt-[24px] w-full rounded-[6px] bg-white-base px-6 py-[19px] shadow-base">
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
        {order.creditCard && <OrderDetailPaymentMethod creditCard={order.creditCard} />}
        {order.address && <OrderDetailAddress address={order.address} />}
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
