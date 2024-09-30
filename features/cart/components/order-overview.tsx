'use client';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { getCoupons } from '@/features/coupon/actions';
import { ApplyCouponButton } from '@/features/coupon/components/apply-coupon-button';
import Link from 'next/link';
import { Cart } from '../types';
import { displayPromoTotal } from '../utils';

type Props = {
  cart: Cart;
};

export function OrderOverview({ cart }: Props) {
  const promoTotal = displayPromoTotal(cart);

  return (
    <>
      <div className="w-full rounded-[6px] bg-white-base px-4 py-[19px] shadow-base">
        <Typography as="title" element="p" className="text-[16px] text-text-100 md:text-[20px]">
          注文概要
        </Typography>

        <div className="mt-4 flex justify-between">
          <Typography as="caption" element="p" className="text-black-90">
            {`商品金額(${cart.attributes.item_count})`}
          </Typography>
          <Typography as="caption" element="p" className="text-black-90">
            {cart.attributes.display_item_total}
          </Typography>
        </div>

        {/* TODO: クーポンでもこれを利用したい */}
        {/* {!!promoTotal && ( */}
        <div className="mt-4 flex justify-between">
          <Typography as="caption" element="p" className="text-black-90">
            {`割引額`}
          </Typography>
          <Typography as="caption" element="p" className="text-bibinBlue-100">
            {promoTotal}
          </Typography>
        </div>
        {/* )} */}

        <div className="mt-4 flex items-center justify-between border-t border-t-black-10 pt-4 md:py-4 md:pt-0">
          <Typography as="caption" element="p" className="text-black-90">
            小計
          </Typography>
          <Typography as="title" element="p" className="text-black-90">
            {cart.attributes.display_total}
          </Typography>
        </div>
        <Link href="/checkout" passHref className="hidden md:block">
          <Button size="lg" variant="lg" className="w-full">
            次へ進む
          </Button>
        </Link>
      </div>

      <div className="fixed bottom-0 ml-[-8px] flex w-screen flex-col justify-between border-t-[1px] bg-white-base px-4 py-2 md:hidden">
        <div className="flex items-center justify-between">
          <Typography as="caption" element="p" className="text-black-90">
            小計
          </Typography>
          <Typography as="title" element="p" className="ml-[4px] text-black-90">
            {cart.attributes.display_item_total}
          </Typography>
        </div>
        <div className="mt-2 flex items-center">
          <ApplyCouponButton getCoupons={getCoupons()} />
          <Link href="/checkout" passHref>
            <Button size="default" variant="lg" className="ml-2 h-[45px] w-[200px] md:w-[202px]">
              購入する
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
