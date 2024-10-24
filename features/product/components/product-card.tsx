'use client';

import { Cart } from '@/components/icons/cart';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { addItem } from '@/features/cart/actions';
import Rating from '@/features/review/components/rating';
import { calculateDiscountPercentage, formatedPrice, isDiscounted } from '@/utils/price';
import { BadgeAlert, Check, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Product } from '../types';
import { ProductVariantModal, ProductVariantModalRef } from './product-variant-modal';

type Props = {
  product: Product;
  imageSize: number;
  deleteButtonAction?: (product: Product) => Promise<void>;
};

export function ProductCard({ product, imageSize, deleteButtonAction = undefined }: Props) {
  const { toast } = useToast();
  const modalRef = useRef<ProductVariantModalRef>(null);

  const defaultVariant = product.relationships.default_variant?.data;
  const available = product.attributes.total_on_hand ? true : false;

  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (deleteButtonAction) {
      setIsDeleting(true);
      await deleteButtonAction(product);
      setIsDeleting(false);
    }
  };

  const addToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (product.relationships.variants?.data && product.relationships.variants?.data?.length > 0) {
      modalRef.current?.open();
    } else {
      const result = await addItem(null, { variantId: defaultVariant?.id || '', quantity: 1 });
      if (result.success) {
        toast({
          title: 'カートに追加しました',
          icon: <Check className="h-6 w-6" />
        });
      } else {
        toast({
          title: result.message,
          className: 'bg-error',
          icon: <BadgeAlert className="h-6 w-6" />
        });
      }
    }
  };

  return (
    <>
      <Link className="flex flex-col" href={`/products/${product.attributes.slug}`} passHref>
        <div className="relative">
          {deleteButtonAction && (
            <button
              className="bg-white absolute right-2 top-2 z-10 rounded-full text-gray-100 shadow-xl"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full shadow-xl md:h-[56px] md:w-[56px]">
                  <LoadingSpinner size={24} />
                </div>
              ) : (
                <X className="h-[32px] w-[32px] rounded-full shadow-xl md:h-[56px] md:w-[56px]" />
              )}
            </button>
          )}
          <Image
            src={product.images[0]?.url || '/placeholder-product-image.png'}
            alt={product.attributes.name || ''}
            width={imageSize}
            height={imageSize}
            className={'h-full rounded-[5px] object-cover'}
            style={{
              height: imageSize,
              width: imageSize
            }}
          />
          {!available && (
            <div className="absolute bottom-0 z-10 w-full rounded-b-[6px] bg-[#000000] opacity-60">
              <Typography as="title" element="p" className="text-center text-slate-100">
                完売
              </Typography>
            </div>
          )}
        </div>
        <Typography
          as="xSmall"
          element="p"
          className={
            'mt-1 overflow-hidden whitespace-normal break-words' + (!available && ' opacity-50')
          }
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1
          }}
        >
          {product.attributes.name}
        </Typography>
        <div className={'items-center gap-2 md:flex' + (!available && ' opacity-50')}>
          <Typography
            as="xSmall"
            element="p"
            className={`md:hidden ${
              product.attributes.total_on_hand === 0 ? 'text-red-500' : 'text-black-70'
            }`}
          >
            {product.attributes.total_on_hand === 0
              ? '完売'
              : `${product.attributes.total_on_hand} 個販売`}
          </Typography>

          <div className="mt-[4px] flex w-full items-end justify-between">
            <div className="flex items-end">
              <Typography as="bold" element="p" className="text-bibinBlue-100">
                {formatedPrice(product.attributes.price)}
              </Typography>

              {isDiscounted(product.attributes.price, product.attributes.compare_at_price) && (
                <div className="hidden md:flex">
                  <div className="relative ml-2 flex items-center justify-center">
                    <Typography as="small" element="p" className="text-black-20">
                      {formatedPrice(product.attributes.compare_at_price)}
                    </Typography>
                    <div className="absolute h-[1px] w-full bg-black-20" />
                  </div>
                  <div className="ml-2 flex items-center rounded-[4px] border border-lightRed px-1 py-[0.5px]">
                    <Typography as="xSmall" element="p" className="text-lightRed">
                      {`-${calculateDiscountPercentage(
                        product.attributes.price,
                        product.attributes.compare_at_price
                      )}%`}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
            <Typography
              as="xSmall"
              element="p"
              className={`hidden md:flex ${
                product.attributes.total_on_hand === 0 ? 'text-red-500' : 'text-black-70'
              }`}
            >
              {product.attributes.total_on_hand === 0
                ? '完売'
                : `${product.attributes.total_on_hand} 個販売`}
            </Typography>
          </div>
          {isDiscounted(product.attributes.price, product.attributes.compare_at_price) && (
            <div className="bg-red flex md:hidden">
              <div className="relative flex items-center justify-center">
                <Typography as="small" element="p" className="text-black-20">
                  {formatedPrice(product.attributes.compare_at_price)}
                </Typography>
                <div className="absolute h-[1px] w-full bg-black-20" />
              </div>
              <div className="ml-2 flex items-center rounded-[4px] border border-lightRed px-1 py-[0.5px]">
                <Typography as="xSmall" element="p" className="text-lightRed">
                  {`-${calculateDiscountPercentage(
                    product.attributes.price,
                    product.attributes.compare_at_price
                  )}%`}
                </Typography>
              </div>
            </div>
          )}
        </div>
        <div
          className={'mt-[4px] flex items-center justify-between ' + (!available && ' opacity-50')}
        >
          <div className="flex items-center">
            {product.attributes.stars != null && (
              <Rating star={product.attributes.stars} size={16} readOnly />
            )}
            <Typography as="xSmall" element="p" className=" text-sunburstYellow">
              {`(${product.attributes.reviews_count})`}
            </Typography>
          </div>
          <button onClick={addToCart} type="button" disabled={!available}>
            <Cart />
          </button>
        </div>
      </Link>
      <ProductVariantModal ref={modalRef} product={product} />
    </>
  );
}
