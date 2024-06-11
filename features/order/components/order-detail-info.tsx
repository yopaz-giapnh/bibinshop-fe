import { Typography } from '@/components/ui/typography';
import { LineItem, VendorTotal } from '@/features/cart/types';
import { Store } from 'lucide-react';
import OrderDetailListItem from './order-detail-list-item';
import OrderDetailSection from './order-detail-section';

type Props = {
  lineItems: LineItem[];
  vendorTotals: VendorTotal[];
};

export function OrderDetailInfo({ lineItems, vendorTotals }: Props) {
  return (
    <OrderDetailSection title="注文情報">
      {vendorTotals.map((vendorTotal) => {
        const lineItemsByVendor = lineItems.filter(
          (lineItem) => lineItem.relationships.vendor?.data?.id === vendorTotal.id
        );

        return (
          <div key={vendorTotal.id}>
            <div className="mt-[16px]">
              <div className="flex items-center">
                <Store className="h-[18px] w-[18px]" />
                <Typography
                  as="boldSmall"
                  element="p"
                  className="ml-[4px] text-[14px] text-black-90"
                >
                  {vendorTotal.attributes.name}
                </Typography>
              </div>
            </div>
            {lineItemsByVendor.map((lineItem) => (
              <OrderDetailListItem
                key={lineItem.id}
                imageSrc={require('/public/placeholder-product-image.png')}
                title={lineItem.attributes.name ?? ''}
                color={''}
                price={lineItem.attributes.display_price ?? ''}
              />
            ))}
            <div className="mt-[16px] border-[1px]" />
          </div>
        );
      })}
    </OrderDetailSection>
  );
}
