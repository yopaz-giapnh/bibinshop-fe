'use client';

import { Share } from '@/components/icons/share';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { addItem, getCart } from '@/features/cart/actions';
import { CartSheet, CartSheetRef } from '@/features/cart/components/cart-sheet';
import { QuantityAdjustmentButtons } from '@/features/cart/components/quantity-adjustment-buttons';
import Rating from '@/features/review/components/rating';
import { useIsPc } from '@/hooks/use-is-pc';
import { calculateDiscountPercentage, formatedPrice, isDiscounted } from '@/utils/price';
import { Check, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Product } from '../types';

type Props = {
  product: Product;
  getCart: ReturnType<typeof getCart>;
};

// type Color = {
//   name: string;
//   value: string;
// };

// TODO: color
// const colors: Color[] = [
//   {
//     name: '赤',
//     value: '#FF0000'
//   },
//   {
//     name: '黒',
//     value: '#000000'
//   },
//   {
//     name: '青',
//     value: '#0000FF'
//   }
// ];

export function ProductCartForm({ product, getCart }: Props) {
  // const isColorProperty = true;
  // const [selectedColor, setSelectedColor] = useState<Color>(colors[0]);
  const isPc = useIsPc();
  const { toast } = useToast();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const [message, formAction] = useFormState(addItem, null);
  const action = formAction.bind(null, {
    productId: product.id,
    quantity: selectedQuantity
  });

  useEffect(() => {
    if (message && message.success && isPc) {
      cartSheetRef.current?.open();
    }
    if (message && message.success && !isPc) {
      toast({
        title: 'カートに追加しました',
        icon: <Check className="h-6 w-6" />
      });
    }
  }, [message, isPc, toast]);

  const cartSheetRef = useRef<CartSheetRef>(null);

  return (
    <>
      <form className="flex flex-col gap-5" action={action}>
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
            <button className="ml-[17.5px]">
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
            {formatedPrice(product.attributes.price)}
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

        {/* TODO: api 実装されてから */}
        {/* <div>
          {isColorProperty ? (
            <div className="flex flex-col py-2">
              <Typography as="boldSmall" element="p" className="text-black-70">
                色: {selectedColor?.name}
              </Typography>
              <div className="mt-2 flex gap-4">
                {colors.map((color) => {
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={clsx(
                        'flex h-8 w-8 items-center justify-center rounded-[16px] ',
                        selectedColor?.name === color.name
                          ? 'border-2 border-bibinBlue-100'
                          : 'border border-black-30'
                      )}
                    >
                      <div
                        className="h-6 w-6 rounded-[12px]"
                        style={{
                          backgroundColor: color.value
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div> */}

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

        <div className="hidden md:block">
          <AddToCartButton />
        </div>
      </form>

      <Suspense>
        <CartSheet ref={cartSheetRef} getCart={getCart} />
      </Suspense>

      <form
        className="fixed bottom-0 z-50 ml-[-16px] flex w-screen items-center justify-between border-t-[1px] bg-white-base px-4 py-2 md:hidden"
        action={action}
      >
        <AddToCartButton />
        <Link href="/cart">
          <ShoppingCart className="h-8 w-8" />
        </Link>
      </form>
    </>
  );
}

function AddToCartButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      size="lg"
      variant="lg"
      className="h-[45px] w-[calc(100vw-80px)] md:w-[350px]"
      disabled={pending}
    >
      {pending ? <LoadingSpinner /> : 'カートに追加'}
    </Button>
  );
}
