import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';
import { Cart } from '../types';

type Props = {
  cart: Cart;
};

export function OrderOverview({ cart }: Props) {
  return (
    <div className="w-full rounded-[6px] bg-white-base px-4 py-[19px] shadow-base">
      <Typography as="title" element="p" className="text-text-100">
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

      <div className="mt-4 flex justify-between">
        <Typography as="caption" element="p" className="text-black-90">
          送料
        </Typography>
        <Typography as="caption" element="p" className="text-black-90">
          {cart.attributes.display_ship_total}
        </Typography>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-t-black-10 py-4">
        <Typography as="caption" element="p" className="text-black-90">
          小計
        </Typography>
        <Typography as="title" element="p" className="text-black-90">
          {cart.attributes.display_total}
        </Typography>
      </div>

      <Link href="/checkout" passHref>
        <Button size="lg" variant="lg" className="w-full">
          購入する
        </Button>
      </Link>
    </div>
  );
}
