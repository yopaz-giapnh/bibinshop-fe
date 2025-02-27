import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { ShippmentSchema } from '@/features/payment/types';
import { KonbiniInfoButton } from './konbini-info-button';

type DeliveryActionButtonsProps = {
  orderNumber: string;
  group: { state: string };
  shipment: ShippmentSchema | undefined;
  shipmentTrackerNumber: string;
  setSelectedShipmentId: (id: string | null) => void;
  orderReceiptConfirmModalRef: React.RefObject<{ open: (id: string) => void }>;
  handleShowShippingInfo: (trackingNumber: string) => void;
  groupSlugs: string[];
  isReviewed: boolean;
  isKonbiniInfo: boolean;
};

export const DeliveryActionButtons: React.FC<DeliveryActionButtonsProps> = ({
  orderNumber,
  group,
  shipment,
  shipmentTrackerNumber,
  setSelectedShipmentId,
  orderReceiptConfirmModalRef,
  handleShowShippingInfo,
  isKonbiniInfo
}) => {
  const isShipped = group.state === 'shipped';

  if (isShipped) {
    return (
      <>
        <Button
          type="button"
          className="mb-[8px] w-full md:mb-0"
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
          <Typography as="bold" element="p" className="ml-[8px] text-[14px] text-bibinBlue-100">
            配送情報
          </Typography>
        </button>
      </>
    );
  }

  if (isKonbiniInfo) {
    return <KonbiniInfoButton orderNumber={orderNumber} />;
  }

  return null;
};
