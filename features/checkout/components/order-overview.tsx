'use client';

import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { Cart } from '@/features/cart/types';
import { displayCouponPromoTotal, displayTotal } from '@/features/cart/utils';
import { useCoupon } from '@/features/coupon/components/coupon-ctx';
import { PointInfoPopover } from '@/features/point-balance/components/point-info-popover';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { updateCheckout } from '../actions';
import { useCheckout } from './checkout-ctx';

type Props = {
  cart: Cart;
  canOrder: boolean;
};

export function OrderOverview({ cart, canOrder }: Props) {
  const { activeAddress, activeCreditCard } = useCheckout();
  const [, formAction] = useFormState(updateCheckout, null);
  const action =
    activeAddress && activeCreditCard
      ? formAction.bind(null, { address: activeAddress, creditCard: activeCreditCard })
      : undefined;
  const { activeCoupon } = useCoupon();
  const [couponPromoTotal, setCouponPromoTotal] = useState<string | null>(null);

  useEffect(() => {
    setCouponPromoTotal(activeCoupon && displayCouponPromoTotal(cart, activeCoupon));
  }, [activeCoupon, cart, setCouponPromoTotal]);

  return (
    <>
      <div className="mt-4 flex justify-between">
        <Typography as="caption" element="p" className="text-black-90">
          {`商品金額(${cart.attributes.item_count})`}
        </Typography>
        <Typography as="caption" element="p" className="text-black-90">
          {cart.attributes.display_item_total}
        </Typography>
      </div>

      {!!couponPromoTotal && (
        <div className="mt-4 flex justify-between">
          <Typography as="caption" element="p" className="text-black-90">
            {`割引金額`}
          </Typography>
          <Typography as="caption" element="p" className="text-black-90">
            {couponPromoTotal}
          </Typography>
        </div>
      )}

      {/* TODO: @point BE接続時動作確認 */}
      <div className="mt-4 flex justify-between">
        <Typography as="caption" element="p" className="text-black-90">
          ポイント利用
        </Typography>
        <Typography as="caption" element="p" className="text-bibinBlue-100">
          -1,000円
        </Typography>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-t-black-10 pt-2 md:py-2 md:pt-0">
        <Typography as="caption" element="p" className="text-black-90">
          小計
        </Typography>
        <Typography as="title" element="p" className="text-black-90">
          {activeCoupon ? displayTotal(cart, activeCoupon) : cart.attributes.display_item_total}
        </Typography>
      </div>

      {/* TODO: @point BE接続時動作確認 */}
      <div className="flex w-full items-center justify-center pt-2 md:pb-2">
        <Typography as="caption" element="p" className="text-black-90">
          獲得予定<span className="text-bibinBlue-100"> 100 </span>ポイント
        </Typography>
        <PointInfoPopover />
      </div>

      {canOrder && (
        <form
          action={action}
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t-[1px] bg-white-base p-[8px] px-[16px] md:hidden"
        >
          <div className="flex w-1/2 items-center">
            <Typography as="caption" element="p" className="mr-[4px] text-black-90">
              小計
            </Typography>
            <Typography as="title" element="p" className="text-black-90">
              {cart.attributes.display_item_total}
            </Typography>
          </div>

          <OrderConfirmButton disabled={!canOrder} />
        </form>
      )}
      <form action={action} className="hidden md:block">
        <OrderConfirmButton disabled={!canOrder} />
      </form>
    </>
  );
}

function OrderConfirmButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      size="lg"
      variant="lg"
      className="h-[48px] w-[170px] md:w-full"
      disabled={pending || disabled}
    >
      {pending ? <LoadingSpinner /> : '次へ進む'}
    </Button>
  );
}
