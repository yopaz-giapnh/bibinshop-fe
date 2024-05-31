'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Typography } from '@/components/ui/typography';
import { X } from 'lucide-react';
import Link from 'next/link';
import { forwardRef, use, useImperativeHandle, useState } from 'react';
import { getCart } from '../actions';
import { CartSheetItem } from './cart-sheet-item';

export type CartSheetRef = {
  open: () => void;
  close: () => void;
};

const cartItems = [
  {
    id: '1',
    name: 'マスカラ モテマスカラ カラーマ...',
    price: 1030,
    quantity: 1
  },
  {
    id: '2',
    name: 'マスカラ モテマスカラ カラーマ...',
    price: 1030,
    quantity: 1
  },
  {
    id: '3',
    name: '【プレミアムUVケア】日焼け止...',
    price: 1030,
    quantity: 1
  },
  {
    id: '4',
    name: 'マスカラ モテマスカラ カラーマ...',
    price: 2060,
    quantity: 2
  }
];

type Props = {
  getCart: ReturnType<typeof getCart>;
};

export const CartSheet = forwardRef<CartSheetRef, Props>(({ getCart }, ref) => {
  const cart = use(getCart);
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }));

  const onClose = () => setIsOpen(false);

  const isCartEmpty = cartItems.length === 0;

  return (
    <Sheet open={isOpen}>
      <SheetContent onBackgroundClick={onClose}>
        <div className="flex h-full flex-col justify-between">
          <div className="h-full">
            <div className="flex justify-between border-b border-black-10 p-[24px]">
              <Typography as="title" element="h1" className="text-text-80">
                カート
              </Typography>
              <button onClick={onClose}>
                <X className="relative h-[24px] w-[24px]" />
              </button>
            </div>

            {isCartEmpty ? (
              <div className="flex h-full items-center justify-center">
                <Typography as="body" element="h1" className="text-center text-black-80">
                  カート内に商品がありません
                </Typography>
              </div>
            ) : (
              <div>
                <ScrollArea className="h-[calc(100vh_-_246px)]">
                  <div className="flex flex-col gap-6 px-6 pt-6">
                    {cart?.lineItems.map((lineItem) => (
                      <CartSheetItem key={lineItem.id} lineItem={lineItem} />
                    ))}
                  </div>
                </ScrollArea>

                <div className="border-t border-black-10 p-6">
                  <Typography as="title" element="h1" className="text-center text-bibinBlue-100">
                    {`合計:${cart?.attributes.display_total}`}
                  </Typography>
                  <Link href="/cart" passHref>
                    <Button size="lg" variant="lg" className="mt-4 w-full">
                      カートに進む
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
});

CartSheet.displayName = 'CartSheet';
