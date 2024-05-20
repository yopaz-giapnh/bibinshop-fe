'use client';

import { Share } from '@/components/icons/share';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { addItem } from '@/features/cart/actions';
import { CartSheet, CartSheetRef } from '@/features/cart/components/cart-sheet';
import { calculateDiscountPercentage, formatedPrice, isDiscounted } from '@/utils/price';
import clsx from 'clsx';
import { Minus, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Product } from '../types';
import { ReviewStars } from './review-stars';

type Props = {
  product: Product;
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

export function ProductCartForm({ product }: Props) {
  const isColorProperty = true;
  const [selectedColor, setSelectedColor] = useState<Color>(colors[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const [message, formAction] = useFormState(addItem, null);
  const actionWithProduct = formAction.bind(null, product.id);

  useEffect(() => {
    if (message && message.success) {
      cartSheetRef.current?.open();
    }
  }, [message]);

  const cartSheetRef = useRef<CartSheetRef>(null);

  return (
    <>
      <form className="flex flex-col gap-5" action={actionWithProduct}>
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
            <ReviewStars reviewCount={5} viewSize={22} starSize={16} />
            <Typography as="xSmall" element="p" className="ml-2 text-sunburstYellow">
              5.0(188)
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
          <div className="ml-[23px] flex items-center justify-center gap-[9px]">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-[16px] bg-powderBlue"
              type="button"
              onClick={() => {
                const quantity = Math.max(selectedQuantity - 1, 1);
                setSelectedQuantity(quantity);
              }}
            >
              <Minus className="h-5 w-5 text-black-30" />
            </button>
            <Typography as="boldSmall" element="p" className="text-black-100 w-[30px] text-center">
              {selectedQuantity}
            </Typography>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-[16px] bg-powderBlue"
              type="button"
              onClick={() => {
                setSelectedQuantity(selectedQuantity + 1);
              }}
            >
              <Plus className="h-5 w-5 text-black-80" />
            </button>
          </div>
        </div>

        <AddToCartButton />
      </form>

      <CartSheet ref={cartSheetRef} />
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
