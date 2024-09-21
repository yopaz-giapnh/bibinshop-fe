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
import { BadgeAlert, Check, Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();

  const { defaultVariant } = product;
  const [selectedVariant, setSelectedVariant] = useState(() => {
    const vid = params.get('variantId');
    if (vid) {
      return product.variants.find((variant) => variant.id === vid) || defaultVariant;
    }
    return defaultVariant;
  });
  const [selectedQuantity, setSelectedQuantity] = useState(1);

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
    //update selected variant when options change
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
      router.push(`${path}?variantId=${variant.id}`);
    }
  }, [selectedOptions]);
  useEffect(() => {
    //update selected options when variant changes
    // this is for reactivity when unavailable variant combination is selected
    setSelectedOptions((prev) => {
      const newOptions = { ...prev };
      if (selectedVariant) {
        selectedVariant.relationships.option_values?.data?.forEach((vov) => {
          for (const optionType of product.optionTypes) {
            if (product.optionsMap[optionType.id].some((o) => o.id === vov?.id)) {
              newOptions[optionType.id] = vov!.id;
            }
          }
        });
      }
      return newOptions;
    });
  }, [selectedVariant]);

  const [state, formAction] = useFormState(addItem, null);
  const action = formAction.bind(null, {
    variantId: selectedVariant?.id || '',
    quantity: selectedQuantity
  });

  useEffect(() => {
    const vid = params.get('variantId');
    if (!vid) {
      setSelectedVariant(defaultVariant);
      return;
    }
    const variant = product.variants.find((variant) => variant.id === vid);
    if (!variant || !variant.attributes.purchasable) {
      router.push(`${path}`);
      return;
    }
    setSelectedVariant(variant);
  }, [params]);

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

        {product.optionTypes.map((optionType) => (
          <div key={optionType.id}>
            <div className="flex gap-1">
              <Typography as="boldSmall" element="p" className="text-black-70">
                {optionType.attributes.presentation}:{' '}
                {selectedOptions[optionType.attributes.presentation]}
              </Typography>
            </div>
            <div className="flex gap-1">
              {product.optionsMap[optionType.id].map((optionValue) => {
                const contextOptions = { ...selectedOptions, [optionType.id]: optionValue.id };
                // if no variant satisfies the condition, the option is disabled
                if (
                  !product.variants.some(
                    (variant) =>
                      variant.attributes.purchasable &&
                      variant.relationships.option_values?.data?.every((vov) => {
                        for (const optionType of product.optionTypes) {
                          if (contextOptions[optionType.id] == vov?.id) {
                            return true;
                          }
                        }
                        return false;
                      })
                  )
                ) {
                  return (
                    <VariantPill
                      key={optionValue.id}
                      state="unavailable"
                      text={optionValue.attributes.presentation}
                      onClick={() => {
                        //if any other combination allows this option, select it
                        const variant = product.variants.find((variant) => {
                          console.log('Checking variant: ', variant);
                          return (
                            variant.attributes.purchasable &&
                            variant.relationships.option_values?.data?.some(
                              (vov) => vov?.id === optionValue.id
                            )
                          );
                        });
                        console.log(variant);
                        if (variant) {
                          router.push(`${path}?variantId=${variant.id}`);
                        }
                      }}
                    />
                  );
                }
                if (selectedOptions[optionType.id] === optionValue.id) {
                  return (
                    <VariantPill
                      key={optionValue.id}
                      state="selected"
                      text={optionValue.attributes.presentation}
                      onClick={() => {
                        setSelectedOptions((prev) => ({
                          ...prev,
                          [optionType.id]: null
                        }));
                      }}
                    />
                  );
                }
                return (
                  <VariantPill
                    key={optionValue.id}
                    state="available"
                    text={optionValue.attributes.presentation}
                    onClick={() => {
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [optionType.id]: optionValue.id
                      }));
                    }}
                  />
                );
              })}
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
