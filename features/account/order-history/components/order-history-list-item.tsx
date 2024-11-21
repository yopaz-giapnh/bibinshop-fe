import { Typography } from '@/components/ui/typography';
import { Order } from '@/features/order/types';
import { extractSlugs, getShipmentStateTitle, getTabValue } from '@/features/order/utils';
import { findImageFromLineItem } from '@/features/product/utils';
import { Review } from '@/features/review/types';
import React from 'react';
import { SortedLineItemGroup } from '../constants';
import { DeliveryActionButtons } from './delivery-acction-buttons';
import OrderHistoryItem from './order-history-item';

type OrderHistoryListItemProps = {
  group: SortedLineItemGroup;
  index: number;
  isLastGroup: boolean;
  order: Order;
  setSelectedShipmentId: (id: string | null) => void;
  orderReceiptConfirmModalRef: React.RefObject<{ open: (id: string) => void }>;
  handleShowShippingInfo: (trackingNumber: string) => void;
  reviews: Review[];
};

const OrderHistoryListItem: React.FC<OrderHistoryListItemProps> = ({
  group,
  index,
  isLastGroup,
  order,
  setSelectedShipmentId,
  orderReceiptConfirmModalRef,
  handleShowShippingInfo,
  reviews
}) => {
  const shipment = order.shipments[index];
  const shipmentTrackerNumber = shipment?.attributes.number ?? '';
  const groupSlugs = extractSlugs([group]).filter((slug): slug is string => slug !== undefined);

  const isReviewed = group.items.some((item) =>
    reviews.some(
      (review) => review.relationships.product?.data?.id === item.relationships.variant?.data?.id
    )
  );

  return (
    <div className="flex flex-col">
      <div className="relative flex w-full justify-between">
        <Typography as="boldSmall" element="p" className="mt-[16px] text-[20px]">
          {getTabValue(group.state)}
        </Typography>

        {/* Desktop Action Buttons */}
        <div className="absolute right-0 top-[16px] hidden md:block">
          <DeliveryActionButtons
            group={group}
            shipment={shipment}
            shipmentTrackerNumber={shipmentTrackerNumber}
            setSelectedShipmentId={setSelectedShipmentId}
            orderReceiptConfirmModalRef={orderReceiptConfirmModalRef}
            handleShowShippingInfo={handleShowShippingInfo}
            groupSlugs={groupSlugs}
            isReviewed={isReviewed}
          />
        </div>
      </div>

      {/* Order Items */}
      {group.items.map((item) => {
        const image = findImageFromLineItem({
          lineItem: item,
          variants: order.variants,
          images: order.images
        });

        return (
          <div key={item.id}>
            <div className="flex">
              <OrderHistoryItem
                item={item}
                image={image}
                status={getShipmentStateTitle(order) ?? undefined}
                showPrice={false}
              />
            </div>
          </div>
        );
      })}

      {/* Mobile Action Buttons */}
      <div className="md:hidden">
        <DeliveryActionButtons
          group={group}
          shipment={shipment}
          shipmentTrackerNumber={shipmentTrackerNumber}
          setSelectedShipmentId={setSelectedShipmentId}
          orderReceiptConfirmModalRef={orderReceiptConfirmModalRef}
          handleShowShippingInfo={handleShowShippingInfo}
          groupSlugs={groupSlugs}
          isReviewed={isReviewed}
        />
      </div>

      {!isLastGroup && <div className="hidden border-[1px] md:block" />}
    </div>
  );
};

export default OrderHistoryListItem;
