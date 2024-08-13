import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { Order } from '@/features/order/types';
import { extractSlugs, getShipmentStateTitle, getTabValue } from '@/features/order/utils';
import { findImageFromLineItem } from '@/features/product/utils';
import { FilePen } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { SortedLineItemGroup } from '../constants';
import OrderHistoryItem from './order-history-item';

type OrderHistoryListItemProps = {
  group: SortedLineItemGroup;
  index: number;
  isLastGroup: boolean;
  order: Order;
  setSelectedShipmentId: (id: string | null) => void;
  orderReceiptConfirmModalRef: React.RefObject<{ open: (id: string) => void }>;
  handleShowShippingInfo: (trackingNumber: string) => void;
};

const OrderHistoryListItem: React.FC<OrderHistoryListItemProps> = ({
  group,
  index,
  isLastGroup,
  order,
  setSelectedShipmentId,
  orderReceiptConfirmModalRef,
  handleShowShippingInfo
}) => {
  const shipment = order.shipments[index];
  const shipmentTrackerNumber = shipment?.attributes.number ?? '';
  const shipmentState = order.attributes.shipment_state;
  const groupSlugs = extractSlugs([group]);

  return (
    <div className="flex flex-col">
      <div className="relative flex w-full justify-between">
        <Typography as="boldSmall" element="p" className="mt-[16px] text-[20px]">
          {getTabValue(group.state)}
        </Typography>
        <div className="absolute right-0 top-[16px] hidden md:block">
          {group.state === 'shipped' && order.attributes.shipment_state === 'shipped' && (
            <>
              <Button
                type="button"
                className="w-full"
                onClick={() => {
                  setSelectedShipmentId(shipment?.id ?? null);
                  orderReceiptConfirmModalRef.current?.open(shipment?.id ?? '');
                }}
              >
                <Typography as="bold" element="p" className="ml-[8px] text-[14px] text-white-base">
                  受取確認
                </Typography>
              </Button>
              <button
                type="button"
                className="mt-[8px] flex w-[222px] items-center justify-center rounded-[100px] border-[1px] border-bibinBlue-100 py-[8px]"
                onClick={() => {
                  if (shipment) {
                    handleShowShippingInfo(shipmentTrackerNumber);
                  }
                }}
              >
                <Typography
                  as="bold"
                  element="p"
                  className="ml-[8px] text-[14px] text-bibinBlue-100"
                >
                  配送情報
                </Typography>
              </button>
            </>
          )}
          {shipmentState !== 'ready' && (
            <Link
              href={`/account/orders/write-review?${groupSlugs
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
      </div>
      {group.items.map((item, itemIndex) => {
        const image = findImageFromLineItem({
          lineItem: item,
          variants: order.variants,
          images: order.images
        });
        const variant = order.variants.find(
          (variant) => variant.id === item.relationships.variant?.data?.id
        );

        return (
          <div key={item.id}>
            <div className="flex">
              <OrderHistoryItem
                item={item}
                image={image}
                status={getShipmentStateTitle(order) ?? undefined}
                optionsText={variant?.attributes.options_text}
                showPrice={false}
              />
            </div>
            {itemIndex === group.items.length - 1 && isLastGroup && (
              <div className="hidden border-[1px] md:block" />
            )}
          </div>
        );
      })}
      <div className="md:hidden">
        {(group.state === 'delivered' || group.state === 'shipped') &&
          order.attributes.shipment_state === 'shipped' && (
            <Button
              type="button"
              className="mb-[8px] w-full"
              onClick={() => {
                setSelectedShipmentId(shipment?.id ?? null);
                orderReceiptConfirmModalRef.current?.open(shipment?.id ?? '');
              }}
            >
              受取確認
            </Button>
          )}
        {(group.state === 'delivered' || group.state === 'shipped') && (
          <div className="flex w-full justify-between pb-[8px]">
            {(group.state === 'shipped' || order.attributes.shipment_state === 'shipped') && (
              <button
                type="button"
                className="mt-[8px] w-[48%] items-center justify-center rounded-[100px] border-[1px] border-bibinBlue-100 py-[8px]"
                onClick={() => {
                  if (shipment) {
                    handleShowShippingInfo(shipmentTrackerNumber);
                  }
                }}
              >
                <Typography as="bold" element="p" className="text-[14px] text-bibinBlue-100">
                  配送情報
                </Typography>
              </button>
            )}
            <Link
              href={`/account/orders/write-review?${groupSlugs
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
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryListItem;
