'use client';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { Order } from '@/features/order/types';
import { findImageFromLineItem } from '@/features/product/utils';
import { Dialog } from '@radix-ui/react-dialog';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { postVariantRating } from '../actions';

export type VariantRatingsModalRef = {
  open: () => void;
  close: () => void;
};

type VariantRatingsModalProps = {
  selectedOrder: Order | null;
  onConfirm: () => void;
};

export const VariantRatingsModal = forwardRef<VariantRatingsModalRef, VariantRatingsModalProps>(
  ({ selectedOrder, onConfirm }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [ratings, setRatings] = useState<Record<string, boolean | null>>({});

    const handleRating = async (variantId: string, rating: boolean) => {
      try {
        await postVariantRating(variantId, rating);
        setRatings((prev) => ({ ...prev, [variantId]: rating }));
      } catch (error) {
        console.error('Rating submission failed:', error);
      }
    };

    const handleOnConfirm = () => {
      if (Object.keys(ratings).length !== 0) {
        onConfirm();
      }
      setIsOpen(false);
    };

    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      }
    }));

    if (!selectedOrder) return null;

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogDescription>
          <DialogContent className="flex w-11/12 flex-col items-center justify-center md:w-[592px]">
            <Typography as="bold" element="p" className="text-[16px] text-black-90 md:text-[20px]">
              ご確認ありがとうございました！
            </Typography>
            <Typography as="caption" element="p" className="text-[14px] text-black-90">
              商品はいかがでしたか？
            </Typography>
            <div className="max-h-[270px] w-full overflow-y-auto overflow-x-hidden md:max-h-[472px]">
              {selectedOrder.lineItems.map((item, index) => {
                const image = findImageFromLineItem({
                  lineItem: item,
                  variants: selectedOrder.variants,
                  images: selectedOrder.images
                });
                const variant = selectedOrder.variants.find(
                  (variant) => variant.id === item.relationships.variant?.data?.id
                );
                const variantId = variant?.id || '';
                const rating = ratings[variantId];

                return (
                  <div
                    className="flex w-full flex-col items-center justify-between py-[16px] md:flex-row"
                    key={index}
                  >
                    <div className="flex w-full md:w-4/5">
                      <div className="relative h-[80px] w-[80px] md:h-[100px] md:w-[100px]">
                        <Image
                          src={
                            image?.attributes.styles?.[image?.attributes.styles?.length - 1].url ||
                            '/placeholder-product-image.png'
                          }
                          layout="fill"
                          objectFit="cover"
                          alt={''}
                        />
                      </div>
                      <div className="ml-[8px] flex flex-col justify-between">
                        <Typography
                          as="bold"
                          element="p"
                          className="max-w-overflow-hidden max-w-[200px] whitespace-normal break-words text-[14px] text-black-90 md:max-w-[280px]"
                          style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {item.attributes.name}e
                        </Typography>
                        {!!variant?.attributes.options_text && (
                          <Typography
                            as="small"
                            element="p"
                            className="mb-2 mt-[4px] text-[12px] text-black-70 md:mb-0"
                          >
                            {variant?.attributes.options_text}
                          </Typography>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Button
                        className={`h-[56px] w-[56px] rounded-full border-[2px] bg-white-base ${
                          rating === true
                            ? 'border-bibinBlue-100 bg-bibinBlue-100'
                            : 'border-gray-400 bg-white-base'
                        }`}
                        size="sm"
                        onClick={() => handleRating(variantId, true)}
                        type="button"
                      >
                        <ThumbsUp
                          className={`h-6 w-6`}
                          color={rating === true ? 'white' : 'rgba(0, 0, 0, 0.50)'}
                        />
                      </Button>
                      <Button
                        className={`h-[56px] w-[56px] rounded-full border-[2px] bg-white-base ${
                          rating === false
                            ? 'border-slate-500 bg-slate-500'
                            : 'border-gray-400 bg-white-base'
                        }`}
                        size="sm"
                        onClick={() => handleRating(variantId, false)}
                        type="button"
                      >
                        <ThumbsDown
                          className="h-6 w-6"
                          color={rating === false ? 'white' : 'rgba(0, 0, 0, 0.50)'}
                        />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button
              onClick={handleOnConfirm}
              type="submit"
              variant="lg"
              className="mt-[24px] w-2/3"
            >
              確認
            </Button>
          </DialogContent>
        </DialogDescription>
      </Dialog>
    );
  }
);

VariantRatingsModal.displayName = 'VariantRatingsModal';
