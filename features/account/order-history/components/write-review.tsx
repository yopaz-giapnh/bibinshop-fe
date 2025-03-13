import { getProducts } from '@/features/product/actions';
import { getMyReviews } from '@/features/review/actions';
import { Suspense } from 'react';
import { WriteReviewFormSkeleton } from './skeletons/write-review-form-skeleton';
import WriteReviewForm from './write-review-form';

type Props = {
  slugs: string[];
  reviewPoint: number;
};

/**
 * レビューを書く画面
 * @returns JSX.Element
 */
export default async function WriteReview({ slugs, reviewPoint }: Props) {
  const products = await getProducts({ query: { 'filter[slugs]': slugs.join(',') } });
  const reviews = await getMyReviews({
    query: { 'filter[product_ids]': products.data.map((product) => product.id).join(',') }
  });

  return (
    <Suspense fallback={<WriteReviewFormSkeleton />}>
      <WriteReviewForm products={products.data} reviews={reviews.data} reviewPoint={reviewPoint} />
    </Suspense>
  );
}
