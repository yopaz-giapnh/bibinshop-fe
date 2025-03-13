'use client';

import { useMemo, useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import type { Product } from '@/features/product/types';
import { getProductImageUrl } from '@/features/product/utils';
import Rating from '@/features/review/components/rating';
import type { Review } from '@/features/review/types';
import Image from 'next/image';
import { RATING_ITEMS } from '../constants';
import type { Ratings } from '../types';
import RatingItem from './rating-item';

const MAX_REVIEW_LENGTH = 1000;
const MIN_REVIEW_LENGTH = 10;

type ReviewParams = {
  productId: string;
  ratings?: Ratings;
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

  const [reviewText, setReviewText] = useState(review?.attributes.review || '');

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

  const handleReviewTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (newValue.length <= MAX_REVIEW_LENGTH) {
      setReviewText(newValue);
      onReviewText({
        productId: product.id,
        text: newValue
      });
    }
  };

  return (
    <div className="mt-[24px] w-full rounded-[6px] bg-white-base p-[16px] shadow-sm">
      <ProductHeader product={product} />
      <OverallRating rating={averageRating} />
      <div className="mt-[12px] border-b border-gray-200 pb-[12px]">
        <Typography as="boldSmall" element="p" className="text-[16px] text-black-90 md:text-[20px]">
          項目評価<span className="text-error">*</span>
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
      <ReviewTextArea value={reviewText} onChange={handleReviewTextChange} />
    </div>
  );
}

type ProductHeaderProps = {
  product: Product;
};

function ProductHeader({ product }: ProductHeaderProps) {
  return (
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
  );
}

type OverallRatingProps = {
  rating: number;
};

function OverallRating({ rating }: OverallRatingProps) {
  return (
    <div className="mt-[12px] border-t border-gray-200 pt-[12px]">
      <Typography
        as="boldSmall"
        element="p"
        className="pr-[16px] text-[16px] text-black-90 md:text-[20px]"
      >
        総合評価
      </Typography>
      <Rating star={rating} readOnly size={27} />
    </div>
  );
}

type ReviewTextAreaProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function ReviewTextArea({ value, onChange }: ReviewTextAreaProps) {
  return (
    <div>
      <div className="mt-[12px] flex items-center">
        <Typography as="small" element="p" className="text-[14px] text-black-90">
          レビュー<span className="text-error">*</span>
        </Typography>
        <Typography as="small" element="p" className="mt-1 text-gray-500">
          （{MIN_REVIEW_LENGTH}文字以上{MAX_REVIEW_LENGTH}文字以内）
        </Typography>
      </div>
      <div className="flex flex-col gap-2">
        <Textarea
          className="mt-[8px] h-[160px] bg-gray-50"
          placeholder="商品の感想を入力してください"
          value={value}
          onChange={onChange}
          maxLength={MAX_REVIEW_LENGTH}
          required
        />
        <Typography as="small" element="p" className="text-right text-gray-500">
          {value.length}/{MAX_REVIEW_LENGTH}文字
        </Typography>
      </div>
    </div>
  );
}
