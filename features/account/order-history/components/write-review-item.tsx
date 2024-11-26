'use client';

import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import { Product } from '@/features/product/types';
import { getProductImageUrl } from '@/features/product/utils';
import Rating from '@/features/review/components/rating';
import { Review } from '@/features/review/types';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { RATING_ITEMS } from '../constants';
import { Ratings } from '../types';
import RatingItem from './rating-item';

type ReviewParams = {
  productId: string;
  ratings?: {
    texture: number;
    finish: number;
    effectiveness: number;
    longevity: number;
    usability: number;
  };
  text?: string;
};

type Props = {
  product: Product;
  review: Review | undefined;
  onReviewRatings: ({ productId, ratings }: ReviewParams) => void;
  onReviewText: ({ productId, text }: ReviewParams) => void;
};

/**
 * レビューを書く画面のアイテムカードコンポーネント
 * @returns JSX.Element
 */
export default function WriteReviewItem({ product, review, onReviewRatings, onReviewText }: Props) {
  const [ratings, setRatings] = useState<Ratings>({
    texture: review?.attributes.texture_rating || 1,
    finish: review?.attributes.finish_rating || 1,
    effectiveness: review?.attributes.effectiveness_rating || 1,
    longevity: review?.attributes.longevity_rating || 1,
    usability: review?.attributes.usability_rating || 1
  });

  const averageRating = useMemo(() => {
    const values = Object.values(ratings);
    const average = values.reduce((acc, curr) => acc + curr, 0) / values.length;
    return Math.round(average);
  }, [ratings]);

  const handleRatingChange = (type: keyof Ratings, value: number) => {
    const newRatings = { ...ratings, [type]: value };
    setRatings(newRatings);
    onReviewRatings({ productId: product.id, ratings: newRatings });
  };

  return (
    <div className="mt-[24px] w-full rounded-[6px] bg-white-base p-[16px] shadow-sm">
      <div className="flex">
        <div className="relative h-[100px] w-[100px]">
          <Image src={getProductImageUrl(product?.images[0])} fill alt={''} />
        </div>
        <div className="ml-[16px] md:ml-[8px]">
          <Typography
            as="bold"
            element="p"
            className="max-w-[200px] overflow-hidden whitespace-normal break-words text-[14px] text-black-90 md:max-w-full"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 4,
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {product?.attributes.name}
          </Typography>
          {/* TODO: 色は api が実装されてから */}
          {/* <Typography as="small" element="p" className="mt-[4px] text-[12px] text-black-70">
            {`色: ${item.color}`}
          </Typography> */}
        </div>
      </div>
      <div className="mt-[12px] border-t border-gray-200 pt-[12px]">
        <Typography
          as="boldSmall"
          element="p"
          className="pr-[16px] text-[16px] text-black-90 md:text-[20px]"
        >
          総合評価
        </Typography>
        <Rating star={averageRating} readOnly size={27} />
      </div>
      <div className="mt-[12px] border-b border-gray-200 pb-[12px]">
        <Typography as="boldSmall" element="p" className="text-[16px] text-black-90 md:text-[20px]">
          項目評価
        </Typography>
        {RATING_ITEMS.map((item) => (
          <RatingItem
            key={item.key}
            label={item.label}
            value={ratings[item.key]}
            onChange={(value) => handleRatingChange(item.key, value)}
          />
        ))}
      </div>

      <Typography
        as="small"
        element="p"
        className="mt-[12px] text-[14px] text-black-90 md:mt-[14px]"
      >
        レビュー
      </Typography>
      <Textarea
        className="mt-[8px] h-[160px] bg-gray-50"
        placeholder="レビュー"
        defaultValue={review?.attributes.review || ''}
        onChange={(event) => {
          onReviewText({
            productId: product.id,
            text: event.target.value
          });
        }}
      />
    </div>
  );
}
