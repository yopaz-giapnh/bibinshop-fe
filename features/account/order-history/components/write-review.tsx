'use client';

import { getProducts } from '@/features/product/actions';
import { getMyReviews } from '@/features/review/actions';
import { Suspense, useEffect, useState } from 'react';
import { WriteReviewFormSkeleton } from './skeletons/write-review-form-skeleton';
import WriteReviewForm from './write-review-form';
import type { Product } from '@/features/product/types';
import type { Review } from '@/features/review/types';

type Props = {
  slugs: string[];
  reviewPoint: number;
};

/**
 * レビューを書く画面
 * @returns JSX.Element
 */
export default function WriteReview({ slugs, reviewPoint }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts({ query: { 'filter[slugs]': slugs.join(',') } });
      setProducts(productsData.data);

      const reviewsData = await getMyReviews({
        query: { 'filter[product_ids]': productsData.data.map((product) => product.id).join(',') }
      });
      setReviews(reviewsData.data);
    };

    fetchData();
  }, [slugs]);

  if (!products || !reviews) {
    return <WriteReviewFormSkeleton />;
  }

  return (
    <Suspense fallback={<WriteReviewFormSkeleton />}>
      <WriteReviewForm products={products} reviews={reviews} reviewPoint={reviewPoint} />
    </Suspense>
  );
}
