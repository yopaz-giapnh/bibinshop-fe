'use client';

import { Share } from '@/components/icons/share';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { addItem } from '@/features/cart/actions';
import { QuantityAdjustmentButtons } from '@/features/cart/components/quantity-adjustment-buttons';
import {
  addToFavorite,
  getIsFavorite,
  removeFromFavorite
} from '@/features/favorite-products/actions';
import Rating from '@/features/review/components/rating';
import {
  NewRegistrationMediationModal,
  NewRegistrationMediationModalRef
} from '@/features/sns/components/new-registration-mediation-modal';
import { useAuth } from '@/hooks/use-auth';
import { calculateDiscountPercentage, formatedPrice, isDiscounted } from '@/utils/price';
import { BadgeAlert, Check, Heart } from 'lucide-react';
import Image from 'next/image';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Product, VariantSchema, VariantState } from '../types';
import {
  filterOptionValues,
  findNewVariant,
  getOptionState,
  getSelectedOptionPresentation
} from '../utils/product';

export type ProductVariantModalRef = {
  open: (product: Product) => void;
  close: () => void;
};

type Props = {
  product: Product;
};

// TODO: ProductCartFormとロジックがほとんど一緒なので、共通化してもいいかも
export const ProductVariantModal = forwardRef<ProductVariantModalRef, Props>((_, ref) => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const newRegistrationMediationModalRef = useRef<NewRegistrationMediationModalRef>(null);

  const [product, setProduct] = useState<Product>();
  const [selectedVariant, setSelectedVariant] = useState<VariantSchema>();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const [isFavoriteLoading, setIsFavoriteLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  // バリエーションごとのお気に入りの同期
  useEffect(() => {
    if (!selectedVariant) {
      setIsFavoriteLoading(false);
      return;
    }

    const syncIsFavorite = async () => {
      setIsFavoriteLoading(true);
      const isFavorite = await getIsFavorite(selectedVariant?.id ?? '');
      setIsFavorite(isFavorite);
      setIsFavoriteLoading(false);
    };
    syncIsFavorite();
  }, [selectedVariant]);

  const available = product?.attributes.total_on_hand
    ? product.attributes.total_on_hand > 0
    : false;

  const [state, formAction] = useFormState(addItem, null);
  const action = formAction.bind(null, {
    variantId: selectedVariant?.id || '',
    quantity: selectedQuantity
  });

  useEffect(() => {
    setSelectedQuantity(1);
  }, [selectedVariant]);

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
    if (!isLoggedIn) {
      newRegistrationMediationModalRef.current?.open();
      return;
    }

    if (!selectedVariant) return;

    setIsFavoriteLoading(true);

    if (isFavorite) {
      setIsFavorite(false);
      await removeFromFavorite(selectedVariant.id);
      toast({
        title: 'お気に入りから削除しました',
        icon: <Check className="h-6 w-6" />
      });
    } else {
      setIsFavorite(true);
      await addToFavorite(selectedVariant.id);
      toast({
        title: 'お気に入りに追加しました',
        icon: <Check className="h-6 w-6" />
      });
    }

    setIsFavoriteLoading(false);
  };

  useImperativeHandle(ref, () => ({
    open: (product: Product) => {
      setProduct(product);
      if (product.defaultVariant) {
        setSelectedVariant(product.defaultVariant);
      }
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
      setProduct(undefined);
    }
  }));

  const handleOptionClick = (clickedOptionId: string) => {
    if (!product) {
      return;
    }

    const newVariant = findNewVariant({
      clickedOptionId,
      product,
      selectedVariant
    });

    if (newVariant) {
      // 新しいバリアントが見つかった場合、selectedVariantを更新
      setSelectedVariant(newVariant);
    } else {
      return;
    }
  };

  if (!product) {
    return null;
  }

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
                  <Typography
                    as="small"
                    element="p"
                    className="text-black-20 line-through decoration-1"
                  >
                    {formatedPrice(product.attributes.compare_at_price)}
                  </Typography>
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
                className={`ml-2 ${!available ? 'text-red-500' : 'text-black-70'}`}
              >
                {!available ? '完売' : `${selectedVariant?.attributes.total_on_hand}個販売`}
              </Typography>
            )}
          </div>

          {product.optionTypes.map((optionType) => (
            <div key={optionType.id}>
              <div className="flex gap-1 pb-[8px]">
                <Typography as="boldSmall" element="p" className="text-black-70">
                  {optionType.attributes.presentation}:{' '}
                  {getSelectedOptionPresentation({ optionType, selectedVariant, product })}
                </Typography>
              </div>
              <div className="flex gap-1">
                {filterOptionValues({
                  optionTypeId: optionType.id,
                  product
                }).map((option) => {
                  return (
                    <VariantPill
                      key={option.id}
                      state={getOptionState({
                        optionValueId: option.id,
                        selectedVariant,
                        variants: product.variants
                      })}
                      text={option.attributes.presentation}
                      onClick={() => handleOptionClick(option.id)}
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
              {isFavoriteLoading ? (
                <div className="hidden h-12 w-12 items-center justify-center rounded-full border-[1px] md:flex">
                  <LoadingSpinner size={18} />
                </div>
              ) : (
                <Heart
                  className="h-12 w-12 rounded-full border-[1px] p-2"
                  color={isFavorite ? 'red' : 'black'}
                  fill={isFavorite ? 'red' : 'white'}
                />
              )}
            </button>

            <NewRegistrationMediationModal ref={newRegistrationMediationModalRef} />
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
