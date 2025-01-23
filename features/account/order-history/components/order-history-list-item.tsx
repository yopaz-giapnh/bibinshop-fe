import { Typography } from '@/components/ui/typography';
import { Order } from '@/features/order/types';
import { extractSlugs, getShipmentStateTitle, getTabValue } from '@/features/order/utils';
import { findImageFromLineItem } from '@/features/product/utils';
import { Review } from '@/features/review/types';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { ClockIcon } from 'lucide-react';
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
  reviews?: Review[];
  showKonbiniMessage?: boolean;
};

const OrderHistoryListItem: React.FC<OrderHistoryListItemProps> = ({
  group,
  index,
  isLastGroup,
  order,
  setSelectedShipmentId,
  orderReceiptConfirmModalRef,
  handleShowShippingInfo,
  reviews,
  showKonbiniMessage
}) => {
  const shipment = order.shipments[index];
  const shipmentTrackerNumber = shipment?.attributes.tracking ?? '';
  const groupSlugs = extractSlugs([group]).filter((slug): slug is string => slug !== undefined);

  const isReviewed = group.items.some((item) =>
    reviews?.some(
      (review) => review.relationships.product?.data?.id === item.relationships.variant?.data?.id
    )
  );

  const konbini = order.konbini;
  const konbiniExpiresAt = konbini?.attributes.expires_at
    ? format(new Date(konbini?.attributes.expires_at), 'yyyy年M月d日 a h:mm', {
        locale: ja
      })
    : '';
  const isPaid = order.attributes.payment_state === 'paid';
  const isDisplayKonbiniMessage = !!order.konbini && !isPaid && !!showKonbiniMessage;

  return (
    <div className="flex flex-col">
      <div className="relative flex w-full justify-between">
        {isDisplayKonbiniMessage ? (
          <div className="mt-[16px] flex flex-row items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center">
              <ClockIcon className="text-bibinViolet-100" />
            </div>
            <Typography as="boldSmall" element="p" className="text-[20px] text-bibinViolet-100">
              {konbiniExpiresAt}{' '}
              <span className="text-black-80">以内にコンビニでお支払いください</span>
            </Typography>
          </div>
        ) : (
          <Typography as="boldSmall" element="p" className="mt-[16px] text-[20px]">
            {getTabValue(group.state)}
          </Typography>
        )}

        {/* Desktop Action Buttons */}
        <div className="absolute right-0 top-[16px] hidden md:block">
          <DeliveryActionButtons
            orderNumber={`${order.attributes.number}`}
            group={group}
            shipment={shipment}
            shipmentTrackerNumber={shipmentTrackerNumber}
            setSelectedShipmentId={setSelectedShipmentId}
            orderReceiptConfirmModalRef={orderReceiptConfirmModalRef}
            handleShowShippingInfo={handleShowShippingInfo}
            groupSlugs={groupSlugs}
            isReviewed={isReviewed}
            isKonbiniInfo={isDisplayKonbiniMessage}
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
          orderNumber={`${order.attributes.number}`}
          group={group}
          shipment={shipment}
          shipmentTrackerNumber={shipmentTrackerNumber}
          setSelectedShipmentId={setSelectedShipmentId}
          orderReceiptConfirmModalRef={orderReceiptConfirmModalRef}
          handleShowShippingInfo={handleShowShippingInfo}
          groupSlugs={groupSlugs}
          isReviewed={isReviewed}
          isKonbiniInfo={isDisplayKonbiniMessage}
        />
      </div>

      {!isLastGroup && <div className="hidden border-[1px] md:block" />}
    </div>
  );
};

export default OrderHistoryListItem;
