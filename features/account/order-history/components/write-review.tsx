import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { getProducts } from '@/features/product/actions';
import { getMyReviews } from '@/features/review/actions';
import { Suspense } from 'react';
import WriteReviewForm from './write-review-form';

type Props = {
  slugs: string[];
};

/**
 * レビューを書く画面
 * @returns JSX.Element
 */
export default async function WriteReview({ slugs }: Props) {
  const products = await getProducts({ query: { 'filter[slugs]': slugs.join(',') } });
  const reviews = await getMyReviews({
    query: { 'filter[product_ids]': products.data.map((product) => product.id).join(',') }
  });

  return (
    // TODO: スケルトンビュー
    <Suspense fallback={<LoadingSpinner />}>
      <WriteReviewForm products={products.data} reviews={reviews.data} />
    </Suspense>
  );
}
