import { Typography } from '@/components/ui/typography';
import { LineItem, VendorTotal } from '@/features/cart/types';
import { ImageSchema, VariantSchema } from '@/features/product/types';
import { findImageFromLineItem, getProductImageUrl } from '@/features/product/utils';
import { Store } from 'lucide-react';
import OrderDetailListItem from './order-detail-list-item';
import OrderDetailSection from './order-detail-section';

type Props = {
  lineItems: LineItem[];
  vendorTotals: VendorTotal[];
  variants: VariantSchema[];
  images: ImageSchema[];
};

export function OrderDetailInfo({ lineItems, vendorTotals, variants, images }: Props) {
  return (
    <OrderDetailSection title="注文情報">
      {vendorTotals.map((vendorTotal, index) => {
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
            {lineItemsByVendor.map((lineItem) => {
              const image = findImageFromLineItem({ lineItem, variants, images });
              const variant = variants.find(
                (variant) => variant.id === lineItem.relationships.variant?.data?.id
              );

              return (
                <OrderDetailListItem
                  key={lineItem.id}
                  imageSrc={getProductImageUrl(image)}
                  title={lineItem.attributes.name ?? ''}
                  price={lineItem.attributes.display_price ?? ''}
                  optionsText={variant?.attributes.options_text}
                  quantity={lineItem.attributes.quantity}
                />
              );
            })}
            {index !== vendorTotals.length - 1 && <div className="mt-[16px] border-[1px]" />}
          </div>
        );
      })}
    </OrderDetailSection>
  );
}
