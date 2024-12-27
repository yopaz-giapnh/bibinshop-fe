'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { useCoupon } from '@/features/coupon/components/coupon-ctx';
import { BadgeAlert, Check, CircleAlert } from 'lucide-react';
import Image from 'next/image';
import { Cart } from '../types';
import { CartItemGroupByShop } from './cart-item-group-by-shop';

type Props = {
  cart: Cart;
};

export function CartItemList({ cart }: Props) {
  const { activeCoupon, removeActiveCoupon } = useCoupon();
  const { toast } = useToast();

  const sagawaShippingVendorsCount =
    cart?.vendors?.filter((vendor) => vendor.attributes.shipping_method_type === 'sagawa_system')
      .length ?? 0;

  const handleRemoveCoupon = async () => {
    const { success, message } = await removeActiveCoupon();
    if (success) {
      toast({
        title: message,
        icon: <Check className="h-6 w-6" />
      });
    } else {
      toast({
        title: message,
        className: 'bg-error',
        icon: <BadgeAlert className="h-6 w-6" />
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {activeCoupon && (
        <div className="flex items-center justify-between rounded-[6px] border border-indigo-200 bg-indigo-100 px-[11px] py-[10px]">
          <div className="flex items-center">
            <Check className="mr-2 h-8 w-8 md:h-4 md:w-4" />
            <Typography
              as="title"
              element="h1"
              className="flex flex-col text-[14px] text-text-80 md:flex-row"
            >
              <span>クーポンを適用しています。</span>
              <span>
                <span className="text-red-500">{cart.attributes.display_coupons_total}</span>
                割引中！
              </span>
            </Typography>
          </div>
          <div>
            <Typography
              as="boldTitle"
              element="button"
              className="text-[14px] text-red-500"
              onClick={handleRemoveCoupon}
            >
              取消し
            </Typography>
          </div>
        </div>
      )}
      {sagawaShippingVendorsCount === 1 && (
        <div className="flex items-center rounded-[6px] border border-yellow-500 bg-yellow-50 px-3 py-2">
          <CircleAlert className="mr-2 h-6 w-6 text-gray-500" />
          <Typography as="title" element="span" className="text-[14px] text-text-80">
            送料無料対象：
          </Typography>
          <div className="ml-2 flex items-center gap-1">
            <Image
              src={'/bibin-official-badge.png'}
              alt={'bibin official badge'}
              width={24}
              height={24}
            />
            <Typography as="title" element="span" className="text-[14px] text-text-80">
              バッジブランドをもう1つ追加すると
            </Typography>
            <Image
              src={'/bibin-official-badge.png'}
              alt={'bibin official badge'}
              width={24}
              height={24}
            />
            <Typography as="title" element="span" className="text-[14px] text-text-80">
              バッジのブランドは送料無料になります
            </Typography>
          </div>
        </div>
      )}
      {sagawaShippingVendorsCount >= 2 && (
        <div className="flex items-center rounded-[6px] border border-yellow-500 bg-yellow-50 px-3 py-2">
          <Typography as="title" element="span" className="text-[14px] text-text-80">
            送料無料対象：
          </Typography>
          <Image
            src={'/bibin-official-badge.png'}
            alt={'bibin official badge'}
            width={24}
            height={24}
          />
          <Typography
            as="title"
            element="span"
            className="ml-1 bg-gradient-to-r from-[#00C2FF] to-[#00CC66] bg-clip-text text-[14px] text-transparent"
          >
            バッジのブランド送料無料適用中！
          </Typography>
        </div>
      )}
      <label
        key="all"
        className="flex cursor-pointer items-center rounded-[6px] bg-white-base px-[11px] py-[10px] shadow-base"
      >
        <Typography
          as="boldTitle"
          element="h2"
          className="text-[16px] text-text-100 md:text-[20px]"
        >
          {`すべての商品 (${cart.attributes.item_count})`}
        </Typography>
      </label>
      <ScrollArea>
        <div className="mb-[16px] flex flex-col gap-4 md:h-[calc(100vh_-_373px)]">
          {cart.vendorTotals.map((vendorTotal) => (
            <CartItemGroupByShop
              key={vendorTotal.id}
              shop={{
                ...vendorTotal,
                lineItems: cart.lineItems.filter(
                  (lineItem) => lineItem.relationships.vendor?.data?.id === vendorTotal.id
                ),
                variants: cart.variants,
                images: cart.images
              }}
              cart={cart}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
