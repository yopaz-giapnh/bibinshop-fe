import Shop from '@/assets/cart/shop.svg';
import { Typography } from '@/components/ui/typography';
import { ImageSchema, VariantSchema } from '@/features/product/types';
import { findImageFromLineItem, getProductImageUrl } from '@/features/product/utils';
import { Vendor } from '@/features/vendor/types';
import { Store } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { updateItemQuantity } from '../actions';
import { LineItem, VendorTotal } from '../types';
import { CartDeleteItemButton, MobileCartDeleteItemButton } from './cart-delete-item-button';
import { QuantityAdjustmentButtons } from './quantity-adjustment-buttons';

type Shop = VendorTotal & {
  lineItems: LineItem[];
  variants: VariantSchema[];
  images: ImageSchema[];
};

type Props = {
  shop: Shop;
  vendors: Vendor[];
};

export function CartItemGroupByShop({ shop, vendors }: Props) {
  const { variants, images } = shop;

  const handleQuantityChange = async (lineItem: LineItem, newQuantity: number) => {
    const currentQuantity = lineItem.attributes.quantity || 1;
    const type = newQuantity > currentQuantity ? 'plus' : 'minus';

    try {
      await updateItemQuantity({ lineItem, type });
    } catch (error) {
      console.error('数量の更新に失敗しました:', error);
    }
  };

  const vendor = vendors.find((vendor) => vendor.id === shop.id);
  const isSagawaShipping = vendor?.attributes.shipping_method_type === 'sagawa_system';

  return (
    <div className="flex flex-col gap-4 rounded-[6px] bg-white-base p-4">
      <Link href={`/vendors/${shop.id}`}>
        <div
          key={shop.id.toString()}
          className="mt-[4px] flex cursor-pointer items-center md:mt-[0px]"
        >
          <div className="flex items-center">
            <Store className="mr-[4px] h-[18px] w-[18px]" />
            <Typography as="bold" element="h2" className="text-[14px] text-black-90 md:text-[18px]">
              {shop.attributes.name}
            </Typography>
            {isSagawaShipping && (
              <div className="ml-2 flex items-center">
                <Image
                  src={'/bibin-official-badge.png'}
                  alt={'bibin official badge'}
                  width={24}
                  height={24}
                />
                <Typography
                  as="boldSmall"
                  element="p"
                  className="ml-1 bg-gradient-to-r from-[#00C2FF] to-[#00CC66] bg-clip-text text-transparent"
                >
                  送料無料対象
                </Typography>
              </div>
            )}
          </div>
        </div>
      </Link>

      {shop.lineItems.map((lineItem) => {
        const key = `${shop.id}-${lineItem.id}`;
        const image = findImageFromLineItem({ lineItem, variants, images });
        const variant = variants.find(
          (variant) => variant.id === lineItem.relationships.variant?.data?.id
        );

        return (
          <div key={key} className="flex cursor-pointer items-center gap-4">
            <div className="relative h-[100px] w-[100px]">
              <Image src={getProductImageUrl(image)} fill className="rounded-[4px]" alt={''} />
            </div>
            <div className="flex h-[100px] flex-1 flex-col justify-between gap-1 md:justify-normal">
              <div className="flex justify-between">
                <Typography
                  as="linkSmall"
                  element="h3"
                  className="max-w-[145px] overflow-hidden whitespace-normal break-words text-[12px] text-black-90  md:max-w-none md:text-[14px]"
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2
                  }}
                >
                  {lineItem.attributes.name}
                </Typography>
                <div className="md:hidden">
                  <MobileCartDeleteItemButton lineItemId={lineItem.id} />
                </div>
              </div>
              {!!variant?.attributes.options_text && (
                <Typography as="subCaption" element="h3" className="text-black-70">
                  {variant.attributes.options_text}
                </Typography>
              )}
              <div className="mb-[10px] flex items-center justify-between md:mb-0">
                <Typography
                  as="linkSmall"
                  element="h3"
                  className="text-[14px] text-bibinBlue-100 md:text-[16px]"
                >
                  {lineItem.attributes.display_price}
                </Typography>

                <div className="flex gap-6">
                  {lineItem.attributes.quantity != null && (
                    <QuantityAdjustmentButtons
                      initialQuantity={lineItem.attributes.quantity}
                      onQuantityChange={(newQuantity) =>
                        handleQuantityChange(lineItem, newQuantity)
                      }
                      quantitiyInStock={variant?.attributes.total_on_hand}
                    />
                  )}
                  <div className="hidden md:block">
                    <CartDeleteItemButton lineItemId={lineItem.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
