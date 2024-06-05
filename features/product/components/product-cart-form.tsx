'use client';

import { Share } from '@/components/icons/share';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { addItem, getCart } from '@/features/cart/actions';
import { CartSheet, CartSheetRef } from '@/features/cart/components/cart-sheet';
import { QuantityAdjustmentButtons } from '@/features/cart/components/quantity-adjustment-buttons';
import Rating from '@/features/review/components/rating';
import { calculateDiscountPercentage, formatedPrice, isDiscounted } from '@/utils/price';
import clsx from 'clsx';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Product } from '../types';

type Props = {
  product: Product;
  getCart: ReturnType<typeof getCart>;
};

type Color = {
  name: string;
  value: string;
};

// TODO: color
const colors: Color[] = [
  {
    name: '赤',
    value: '#FF0000'
  },
  {
    name: '黒',
    value: '#000000'
  },
  {
    name: '青',
    value: '#0000FF'
  }
];

export function ProductCartForm({ product, getCart }: Props) {
  const isColorProperty = true;
  const [selectedColor, setSelectedColor] = useState<Color>(colors[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const [message, formAction] = useFormState(addItem, null);
  const action = formAction.bind(null, {
    productId: product.id,
    quantity: selectedQuantity
  });

  useEffect(() => {
    if (message && message.success) {
      cartSheetRef.current?.open();
    }
  }, [message]);

  const cartSheetRef = useRef<CartSheetRef>(null);

  return (
    <>
      <form className="flex flex-col gap-5" action={action}>
        <div>
          <div className="flex">
            <Typography as="small" element="h1" className="text-text-80">
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

        <div>
          {isColorProperty ? (
            <div className="flex flex-col py-2">
              <Typography as="boldSmall" element="p" className="text-black-70">
                色: {selectedColor?.name}
              </Typography>
              {/* TODO: 色名 */}
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
        </div>

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

        <AddToCartButton />
      </form>

      <Suspense>
        <CartSheet ref={cartSheetRef} getCart={getCart} />
      </Suspense>
    </>
  );
}

function AddToCartButton() {
  const { pending } = useFormStatus();

  return (
    <Button size="lg" variant="lg" className="w-[350px]" disabled={pending}>
      {pending ? <LoadingSpinner /> : 'カートに追加'}
    </Button>
  );
}
