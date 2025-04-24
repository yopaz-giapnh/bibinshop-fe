'use client';

import { Cart } from '@/components/icons/cart';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { addItem } from '@/features/cart/actions';
import Rating from '@/features/review/components/rating';
import { calculateDiscountPercentage, formatedPrice, isDiscounted } from '@/utils/price';
import { motion } from 'framer-motion';
import { BadgeAlert, Check, Heart, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef, useRef, useState } from 'react';
import { getProduct } from '../actions';
import { Product } from '../types';
import { ProductVariantModal, ProductVariantModalRef } from './product-variant-modal';

type Props = {
  product: Product;
  imageSize: number;
  deleteButtonAction?: (product: Product) => Promise<void>;
  isFavoriteList?: boolean;
};

export const ProductCard = forwardRef<HTMLDivElement, Props>(
  ({ product, imageSize, deleteButtonAction = undefined, isFavoriteList = false }, ref) => {
    const { toast } = useToast();
    const modalRef = useRef<ProductVariantModalRef>(null);
    const isSagawaShipping = product.vendor?.attributes.shipping_method_type === 'sagawa_system';

    const defaultVariant = product.relationships.default_variant?.data;
    const available = product.attributes.total_on_hand
      ? product.attributes.total_on_hand > 0
      : false;

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

    const [isLoadingCart, setIsLoadingCart] = useState(false);
    const addToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsLoadingCart(true);

      if (
        product.relationships.variants?.data &&
        product.relationships.variants?.data?.length > 0
      ) {
        // FIXME: taxonsだとdefaultVariantが取得できないので、詳細のAPIで取得している
        const p = await getProduct(product.id);
        if (p) {
          modalRef.current?.open(p);
        }
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
      setIsLoadingCart(false);
    };

    return (
      <motion.div
        ref={ref}
        className="group relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          whileHover={{ scale: 1.02 }}
          layout
        >
          <Link className="flex flex-col" href={`/products/${product.attributes.slug}`} passHref>
            <div className="relative">
              {deleteButtonAction && (
                <motion.button
                  className={`absolute right-2 top-2 z-10 rounded-full text-gray-100 shadow-xl ${
                    !isFavoriteList ? 'bg-white' : 'bg-red-500'
                  }`}
                  onClick={handleDelete}
                  disabled={isDeleting}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDeleting ? (
                    <div className="bg-white flex h-[32px] w-[32px] items-center justify-center rounded-full shadow-xl md:h-[56px] md:w-[56px]">
                      <LoadingSpinner size={24} />
                    </div>
                  ) : isFavoriteList ? (
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 15, -15, 0]
                      }}
                      transition={{
                        duration: 0.4,
                        ease: 'easeInOut'
                      }}
                    >
                      <Heart
                        className="text-red h-[32px] w-[32px] rounded-full p-2 shadow-xl md:h-[56px] md:w-[56px]"
                        fill="red"
                      />
                    </motion.div>
                  ) : (
                    <X className="h-[32px] w-[32px] rounded-full shadow-xl md:h-[56px] md:w-[56px]" />
                  )}
                </motion.button>
              )}
              <Image
                src={product.images[0]?.url || '/placeholder-product-image.png'}
                alt={product.attributes.name || ''}
                width={imageSize}
                height={imageSize}
                className="aspect-square w-full rounded-[10px] border border-gray-200 object-cover"
              />
              {!available && (
                <div className="absolute bottom-0 z-10 w-full rounded-b-[6px] bg-[#000000] opacity-60">
                  <Typography as="title" element="p" className="text-center text-slate-100">
                    完売
                  </Typography>
                </div>
              )}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <Typography
                as="small"
                element="p"
                className={
                  'mt-1 overflow-hidden whitespace-normal break-words' +
                  (!available && ' opacity-50')
                }
                style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 1
                }}
              >
                {product.attributes.name}
              </Typography>
              {isSagawaShipping && (
                <div className="ml-1 hidden shrink-0 items-center rounded-full border border-yellow-500 bg-yellow-50 px-1 py-1 md:flex">
                  <Image
                    src={'/bibin-official-badge.png'}
                    alt={'bibin official badge'}
                    width={16}
                    height={16}
                  />
                  <Typography
                    as="xSmall"
                    element="p"
                    className="ml-1 whitespace-nowrap bg-gradient-to-r from-[#00C2FF] to-[#00CC66] bg-clip-text text-transparent"
                  >
                    送料無料対象
                  </Typography>
                </div>
              )}
            </div>
            <div className={'items-center gap-2 md:flex' + (!available && ' opacity-50')}>
              <div className="mt-[4px] flex items-center justify-between md:mt-0">
                {isSagawaShipping && (
                  <div className="ml-1 flex shrink-0 items-center rounded-full border border-yellow-500 bg-yellow-50 p-[2px] md:hidden">
                    <Image
                      src={'/bibin-official-badge.png'}
                      alt={'bibin official badge'}
                      width={12}
                      height={12}
                    />
                    <Typography
                      as="xSmall"
                      element="p"
                      className="ml-1 whitespace-nowrap bg-gradient-to-r from-[#00C2FF] to-[#00CC66] bg-clip-text text-[10px] text-transparent"
                    >
                      送料無料対象
                    </Typography>
                  </div>
                )}
              </div>

              <div className="mt-[4px] flex w-full items-end justify-between">
                <div className="flex items-end">
                  <Typography as="bold" element="p" className="text-bibinBlue-100">
                    {formatedPrice(product.attributes.price)}
                  </Typography>

                  {isDiscounted(product.attributes.price, product.attributes.compare_at_price) && (
                    <div className="hidden md:flex">
                      <div className="relative ml-2 flex items-center justify-center">
                        <Typography
                          as="small"
                          element="p"
                          className="text-black-20 line-through decoration-1"
                        >
                          {formatedPrice(product.attributes.compare_at_price)}
                        </Typography>
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
              </div>
              {isDiscounted(product.attributes.price, product.attributes.compare_at_price) && (
                <div className="bg-red flex md:hidden">
                  <div className="relative flex items-center justify-center">
                    <Typography
                      as="small"
                      element="p"
                      className="text-black-20 line-through decoration-1"
                    >
                      {formatedPrice(product.attributes.compare_at_price)}
                    </Typography>
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
              className={
                'mt-[4px] flex items-center justify-between ' + (!available && ' opacity-50')
              }
            >
              <div className="flex items-center">
                {product.attributes.stars != null && (
                  <Rating star={product.attributes.stars} size={16} readOnly />
                )}
                <Typography as="xSmall" element="p" className=" text-sunburstYellow">
                  {`(${product.attributes.reviews_count})`}
                </Typography>
              </div>
              <motion.button
                onClick={addToCart}
                type="button"
                disabled={!available || isLoadingCart}
                className="flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  animate={
                    isLoadingCart
                      ? {
                          scale: [1, 0.9, 1],
                          rotate: [0, 360]
                        }
                      : {
                          scale: 1,
                          rotate: 0
                        }
                  }
                  transition={
                    isLoadingCart
                      ? {
                          duration: 1,
                          ease: 'linear',
                          repeat: Infinity
                        }
                      : {
                          duration: 0.3,
                          ease: 'easeOut'
                        }
                  }
                >
                  <Cart className={isLoadingCart ? 'text-bibinBlue-100' : ''} />
                </motion.div>
              </motion.button>
            </div>
          </Link>
        </motion.div>
        <ProductVariantModal ref={modalRef} product={product} />
      </motion.div>
    );
  }
);

ProductCard.displayName = 'ProductCard';
