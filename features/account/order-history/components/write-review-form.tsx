'use client';

import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { toast } from '@/components/ui/use-toast';
import { Product } from '@/features/product/types';
import { saveReviews } from '@/features/review/actions';
import { Review } from '@/features/review/types';
import { isNumber } from '@/utils/isNumber';
import { BadgeAlert, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import WriteReviewItem from './write-review-item';

type Props = {
  products: Product[];
  reviews: Review[];
};

export type WriteReview = {
  productId: string;
  rating: number;
  review?: string;
  reviewId?: string;
};

export default function WriteReviewForm({ products, reviews }: Props) {
  const [writeReviews, setWriteReviews] = useState<WriteReview[]>(
    reviews.map((review) => ({
      productId: review.product?.id || '',
      rating: review.attributes.rating || 0,
      review: review.attributes.review || '',
      reviewId: review.id
    }))
  );
  const isValid =
    !!writeReviews.length && writeReviews.some((review) => !!review.rating && review.rating > 0);

  const [state, formAction] = useFormState(saveReviews, null);
  const action = formAction.bind(null, writeReviews);
  const router = useRouter();

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.success) {
      toast({
        title: state.message,
        icon: <Check className="h-6 w-6" />
      });
      router.push('/account/profile');
    } else {
      toast({
        title: state.message,
        className: 'bg-error',
        icon: <BadgeAlert className="h-6 w-6" />
      });
    }
  }, [router, state]);

  return (
    <form className="w-full" action={action}>
      <div className="flex w-full flex-col items-center">
        <div className="w-full overflow-y-auto md:h-screen-calc">
          {products.map((product) => (
            <WriteReviewItem
              key={product.id}
              product={product}
              review={reviews.find((review) => review.product?.id === product.id)}
              onReviewStar={({ productId, star }) => {
                const targetReview = writeReviews.find((review) => review.productId === productId);
                if (isNumber(star)) {
                  setWriteReviews((prev) => {
                    if (targetReview) {
                      return [
                        ...prev.filter((review) => review.productId !== productId),
                        { ...targetReview, rating: star || targetReview.rating }
                      ];
                    } else {
                      return [...prev, { productId, rating: star }];
                    }
                  });
                }
              }}
              onReviewText={({ productId, text }) => {
                const targetReview = writeReviews.find((review) => review.productId === productId);
                setWriteReviews((prev) => {
                  if (targetReview) {
                    return [
                      ...prev.filter((review) => review.productId !== productId),
                      { ...targetReview, review: text, rating: targetReview.rating ?? 0 }
                    ];
                  } else {
                    return [...prev, { productId, review: text, rating: 0 }];
                  }
                });
              }}
            />
          ))}
        </div>
        <SubmitButton disabled={!isValid} />
      </div>
    </form>
  );
}

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="lg"
      className="m-[16px] mt-[24px] w-full md:w-[392px]"
      disabled={disabled || pending}
    >
      {pending ? <LoadingSpinner /> : '提出'}
    </Button>
  );
}
