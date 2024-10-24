'use client';

import { Share } from '@/components/icons/share';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { addItem } from '@/features/cart/actions';
import { QuantityAdjustmentButtons } from '@/features/cart/components/quantity-adjustment-buttons';
import Rating from '@/features/review/components/rating';
import { calculateDiscountPercentage, formatedPrice, isDiscounted } from '@/utils/price';
import { BadgeAlert, Check, Heart } from 'lucide-react';
import Image from 'next/image';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { addToFavorite, removeFromFavorite } from '../actions';
import { Product } from '../types';

export type ProductVariantModalRef = {
  open: () => void;
  close: () => void;
};

type Props = {
  product: Product;
};

// TODO: ProductCartFormとロジックがほとんど一緒なので、共通化してもいいかも
export const ProductVariantModal = forwardRef<ProductVariantModalRef, Props>(({ product }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const { defaultVariant } = product;
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(
    () => selectedVariant?.attributes.is_favorite ?? false
  );

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string | null>>(() => {
    return (
      selectedVariant?.relationships.option_values?.data?.reduce(
        (acc, vov) => {
          for (const optionType of product.optionTypes) {
            if (product.optionsMap[optionType.id].some((o) => o.id === vov?.id)) {
              acc[optionType.id] = vov!.id;
            }
          }
          return acc;
        },
        {} as Record<string, string | null>
      ) ?? {}
    );
  });

  useEffect(() => {
    const variant = product.variants.find((variant) => {
      return (
        variant.attributes.purchasable &&
        variant.relationships.option_values?.data?.every((vov) => {
          for (const optionType of product.optionTypes) {
            if (selectedOptions[optionType.id] == vov?.id) {
              return true;
            }
          }
          return false;
        })
      );
    });
    if (variant) {
      setSelectedVariant(variant);
    }
  }, [selectedOptions, product.variants, product.optionTypes]);

  useEffect(() => {
    setIsFavorite(selectedVariant?.attributes.is_favorite ?? false);
  }, [selectedVariant]);

  const [state, formAction] = useFormState(addItem, null);
  const action = formAction.bind(null, {
    variantId: selectedVariant?.id || '',
    quantity: selectedQuantity
  });

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.success) {
      toast({
        title: 'カートに追加しました',
        icon: <Check className="h-6 w-6" />
      });
      setIsOpen(false);
    } else {
      toast({
        title: state.message,
        className: 'bg-error',
        icon: <BadgeAlert className="h-6 w-6" />
      });
    }
  }, [state, toast]);

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
          icon: <BadgeAlert className="h-6 w-6" />
        });
      });
  };

  const onPressFavorite = async () => {
    if (!selectedVariant) return;
    if (isFavorite) {
      await removeFromFavorite(selectedVariant.id);
      toast({
        title: 'お気に入りから削除しました',
        icon: <Check className="h-6 w-6" />
      });
    } else {
      await addToFavorite(selectedVariant.id);
      toast({
        title: 'お気に入りに追加しました',
        icon: <Check className="h-6 w-6" />
      });
    }
    setIsFavorite((prev) => !prev);
  };

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[450px]">
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex w-full justify-center">
              <Image
                src={product.images[0]?.url || '/placeholder-product-image.png'}
                alt={product.attributes.name || ''}
                width={300}
                height={300}
                className={'h-full rounded-[5px] object-cover'}
                style={{
                  height: 300,
                  width: 300
                }}
              />
            </div>
            <div className="mt-4 flex w-full justify-between">
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

            <div className="mt-[5px] flex w-fit items-center justify-start">
              {product.attributes.stars != null && (
                <Rating star={product.attributes.stars} size={16} readOnly />
              )}
              <Typography as="xSmall" element="p" className="text-sunburstYellow">
                {`(${product.attributes.reviews_count})`}
              </Typography>
            </div>
          </div>

          <div className="flex items-end gap-2">
            <Typography as="bold" element="p" className="text-bibinBlue-100">
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

            {product.attributes.total_on_hand !== undefined && (
              <Typography
                as="boldSmall"
                element="p"
                className={`ml-2 ${
                  product.attributes.total_on_hand === 0 ? 'text-red-500' : 'text-black-70'
                }`}
              >
                {product.attributes.total_on_hand === 0
                  ? '完売'
                  : `${product.attributes.total_on_hand}個販売`}
              </Typography>
            )}
          </div>

          {product.optionTypes.map((optionType) => (
            <div key={optionType.id}>
              <div className="flex gap-1">
                <Typography as="boldSmall" element="p" className="text-black-70">
                  {optionType.attributes.presentation}:{' '}
                  {selectedOptions[optionType.attributes.presentation]}
                </Typography>
              </div>
              <div className="flex gap-1">
                {product.optionsMap[optionType.id].map((optionValue) => (
                  <VariantPill
                    key={optionValue.id}
                    state={
                      selectedOptions[optionType.id] === optionValue.id ? 'selected' : 'available'
                    }
                    text={optionValue.attributes.presentation}
                    onClick={() => {
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [optionType.id]: optionValue.id
                      }));
                    }}
                  />
                ))}
              </div>
            </div>
          ))}

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
                  setSelectedQuantity(
                    Math.min(
                      selectedQuantity + 1,
                      Math.min(23, selectedVariant?.attributes.total_on_hand ?? 0)
                    )
                  );
                }}
              />
            </div>
          </div>

          <div className="flex items-center">
            <form action={action}>
              <AddToCartButton />
            </form>
            <button className="ml-2" onClick={onPressFavorite}>
              <Heart
                className="h-12 w-12 rounded-full border-[1px] p-2"
                color={isFavorite ? 'red' : 'black'}
                fill={isFavorite ? 'red' : 'white'}
              />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

ProductVariantModal.displayName = 'ProductVariantModal';

function AddToCartButton() {
  const { pending } = useFormStatus();

  return (
    <Button size="lg" variant="lg" className="h-[45px] w-[300px] md:w-[350px]" disabled={pending}>
      {pending ? <LoadingSpinner /> : 'カートに追加'}
    </Button>
  );
}

type VariantState = 'selected' | 'available' | 'unavailable';
type VairantPillParams = {
  state: VariantState;
  text?: string;
  onClick?: () => void;
};
function VariantPill({ state, text, onClick }: VairantPillParams) {
  switch (state) {
    case 'unavailable':
      return (
        <Typography
          className="mx-1 flex h-8 items-center whitespace-nowrap rounded-full bg-[#000000]/5 p-2 text-[#000000]/20"
          element="div"
          as="small"
          style={{
            cursor: 'pointer'
          }}
          onClick={onClick}
        >
          {text}
        </Typography>
      );
    case 'available':
      return (
        <Typography
          className="mx-1 flex h-8 items-center whitespace-nowrap rounded-full border border-[#000000]/50  bg-[#FFFFFF] p-2 text-[#000000]/50"
          element="div"
          as="small"
          style={{
            cursor: 'pointer'
          }}
          onClick={onClick}
        >
          {text}
        </Typography>
      );
    case 'selected':
      return (
        <Typography
          className="mx-1 flex h-8 items-center whitespace-nowrap rounded-full bg-[#000000]/80 p-2 text-[#FFFFFF]"
          element="div"
          as="small"
          style={{
            cursor: 'pointer'
          }}
          onClick={onClick}
        >
          {text}
        </Typography>
      );
    default:
      return <></>;
  }
}
