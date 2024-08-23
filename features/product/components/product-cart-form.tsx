'use client';

import { Share } from '@/components/icons/share';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { addItem, getCart } from '@/features/cart/actions';
import { CartSheet, CartSheetRef } from '@/features/cart/components/cart-sheet';
import { QuantityAdjustmentButtons } from '@/features/cart/components/quantity-adjustment-buttons';
import Rating from '@/features/review/components/rating';
import { useIsPc } from '@/hooks/use-is-pc';
import { cn } from '@/lib/utils';
import { calculateDiscountPercentage, formatedPrice, isDiscounted } from '@/utils/price';
import { BadgeAlert, Check, Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Product } from '../types';

type Props = {
  product: Product;
  getCart: ReturnType<typeof getCart>;
};

export function ProductCartForm({ product, getCart }: Props) {
  const isPc = useIsPc();
  const { toast } = useToast();

  const { defaultVariant } = product;
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const [state, formAction] = useFormState(addItem, null);
  const action = formAction.bind(null, {
    variantId: selectedVariant?.id || '',
    quantity: selectedQuantity
  });

  useEffect(() => {
    if (!state) {
      return;
    }
    //TODO: 購入制限toastを表示するロジック追加

    if (state.success) {
      if (isPc) {
        cartSheetRef.current?.open();
      } else {
        toast({
          title: 'カートに追加しました',
          icon: <Check className="h-6 w-6" />
        });
      }
    } else {
      toast({
        title: state.message,
        className: 'bg-error',
        icon: <BadgeAlert className="h-6 w-6" />
      });
    }
  }, [state, isPc, toast]);

  const cartSheetRef = useRef<CartSheetRef>(null);

  const onPressShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast({
          title: 'リンクをコピーしました',
          icon: <Check className="h-6 w-6" />
        });
      })
      .catch(() => {
        toast({
          title: 'リンクのコピーに失敗しました',
          icon: <Check className="h-6 w-6" />
        });
      });
  };

  const onPressFavorite = () => {
    // TODO: お気に入りに追加するAPIを呼び出す
    toast({
      title: 'お気に入りに追加しました',
      icon: <Check className="h-6 w-6" />
    });
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <div className="flex justify-between md:justify-normal">
            <Typography
              as="small"
              element="h1"
              className="max-w-[300px] overflow-hidden whitespace-normal break-words text-text-80 md:max-w-[500px]"
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3
              }}
            >
              {product.attributes.name}
            </Typography>
            <button className="ml-[17.5px]" onClick={onPressShare}>
              <Share className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-[5px] flex items-center">
            {product.attributes.stars != null && (
              <Rating star={product.attributes.stars} size={16} readOnly />
            )}
            <Typography as="xSmall" element="p" className="ml-2 text-sunburstYellow">
              {`(${product.attributes.reviews_count})`}
            </Typography>
          </div>
        </div>

        <div className="flex gap-2">
          <Typography as="boldXLarge" element="p" className="text-bibinBlue-100">
            {formatedPrice(selectedVariant?.attributes.price)}
          </Typography>

          {isDiscounted(product.attributes.price, product.attributes.compare_at_price) && (
            <>
              <div className="relative flex items-center justify-center">
                <Typography as="small" element="p" className="text-black-20">
                  {formatedPrice(product.attributes.compare_at_price)}
                </Typography>
                <div className="absolute h-[1px] w-full bg-black-20" />
              </div>
              <div className="flex items-center rounded-[4px] border border-lightRed px-1 py-[0.5px]">
                <Typography as="xSmall" element="p" className="text-lightRed">
                  {`-${calculateDiscountPercentage(
                    product.attributes.price,
                    product.attributes.compare_at_price
                  )}%`}
                </Typography>
              </div>
            </>
          )}
        </div>

        <ScrollArea className="whitespace-nowrap md:w-[40vw]">
          <div className="flex gap-1">
            {product.variants.map((variant) => {
              const isSelected = variant.id === selectedVariant?.id;

              return (
                <button
                  key={variant.id}
                  className={cn(
                    'flex rounded-[6px] border border-black-10 bg-white-base p-4 md:mt-0 md:w-fit',
                    isSelected && 'border-2 border-bibinBlue-100'
                  )}
                  onClick={() => {
                    setSelectedVariant(variant);
                  }}
                >
                  <Typography as="boldSmall" element="p" className="text-black-70">
                    {variant.attributes.options_text}
                  </Typography>
                </button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" className="pt-[8px]" />
        </ScrollArea>

        <div className="flex items-center py-2">
          <Typography as="boldSmall" element="p" className="text-black-70">
            数量:
          </Typography>
          <div className="ml-[23px]">
            <QuantityAdjustmentButtons
              quantity={selectedQuantity}
              onDecrease={() => {
                const quantity = Math.max(selectedQuantity - 1, 1);
                setSelectedQuantity(quantity);
              }}
              onIncrease={() => {
                setSelectedQuantity(selectedQuantity + 1);
              }}
            />
          </div>
        </div>

        <div className="flex items-center">
          <form className="hidden md:block" action={action}>
            <AddToCartButton />
          </form>
          <button className="ml-2" onClick={onPressFavorite}>
            <Heart className="h-12 w-12 rounded-full border-[1px] p-2" />
          </button>
        </div>
      </div>

      <Suspense>
        <CartSheet ref={cartSheetRef} getCart={getCart} />
      </Suspense>

      <div className="fixed bottom-0 z-50 ml-[-16px] flex w-full items-center justify-between border-t-[1px] bg-white-base px-4 py-2 md:hidden">
        <form action={action} className="w-full">
          <AddToCartButton />
        </form>
        <button className="ml-2" onClick={onPressFavorite}>
          <Heart className="h-10 w-10 rounded-full border-[1px] p-2" />
        </button>
        <Link href="/cart" className="ml-2">
          <ShoppingCart className="h-8 w-8" />
        </Link>
      </div>
    </>
  );
}

function AddToCartButton() {
  const { pending } = useFormStatus();

  return (
    <Button size="lg" variant="lg" className="h-[45px] w-full md:w-[350px]" disabled={pending}>
      {pending ? <LoadingSpinner /> : 'カートに追加'}
    </Button>
  );
}
