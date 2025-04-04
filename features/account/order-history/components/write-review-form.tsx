'use client';

import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { toast } from '@/components/ui/use-toast';
import { Product } from '@/features/product/types';
import { saveReviews } from '@/features/review/actions';
import { Review } from '@/features/review/types';
import { BadgeAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { DEFAULT_RATINGS } from '../constants';
import WriteReviewItem from './write-review-item';
import CompleteReviewModal from './complete-review-modal';

const MAX_REVIEW_LENGTH = 1000;
const MIN_REVIEW_LENGTH = 10;

type Props = {
  products: Product[];
  reviews: Review[];
  reviewPoint: number;
};

type WriteReview = {
  productId: string;
  ratings: {
    effectiveness: number;
    satisfaction: number;
    repurchase: number;
    finish: number;
    skin_type: number;
  };
  review?: string;
  reviewId?: string;
};

export default function WriteReviewForm({ products, reviews, reviewPoint }: Props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [writeReviews, setWriteReviews] = useState<WriteReview[]>(
    reviews.map((review) => ({
      productId: review.product?.id || review.relationships.product?.data?.id || '',
      ratings: {
        effectiveness: review.attributes.effectiveness_rating || 1,
        satisfaction: review.attributes.satisfaction_rating || 1,
        repurchase: review.attributes.repurchase_rating || 1,
        finish: review.attributes.finish_rating || 1,
        skin_type: review.attributes.skin_type_rating || 1
      },
      review: review.attributes.review || '',
      reviewId: review.id
    }))
  );

  const formAction = async () => {
    const reviews = writeReviews.map((review) => ({
      productId: review.productId,
      ratings: {
        effectiveness: review.ratings.effectiveness,
        satisfaction: review.ratings.satisfaction,
        repurchase: review.ratings.repurchase,
        finish: review.ratings.finish,
        skin_type: review.ratings.skin_type
      },
      review: review.review,
      reviewId: review.reviewId
    }));

    return await saveReviews(reviews);
  };

  const [state, action] = useFormState(formAction, null);

  const isValid =
    !!writeReviews.length &&
    writeReviews.some((review) => {
      const ratingValues = Object.values(review.ratings);
      const hasRating = ratingValues.some((rating) => rating > 0);
      const hasValidReviewText =
        review.review &&
        review.review.trim().length >= MIN_REVIEW_LENGTH &&
        review.review.trim().length <= MAX_REVIEW_LENGTH;
      return hasRating && hasValidReviewText;
    });

  const updateReview = (productId: string, updateData: Partial<WriteReview>): void => {
    setWriteReviews((prev) => {
      const existingReviewIndex = prev.findIndex((review) => review.productId === productId);

      if (existingReviewIndex !== -1) {
        const updatedReviews = [...prev];
        updatedReviews[existingReviewIndex] = {
          ...updatedReviews[existingReviewIndex],
          ...updateData
        };
        return updatedReviews;
      }

      return [
        ...prev,
        {
          productId,
          ratings: DEFAULT_RATINGS,
          review: '',
          ...updateData
        }
      ];
    });
  };

  const handleButtonClick = () => {
    setIsModalOpen(false);
    router.push('/account/order-history');
  };

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.success) {
      setIsModalOpen(true);
    } else {
      toast({
        title: state.message,
        className: 'bg-error',
        icon: <BadgeAlert className="h-6 w-6" />
      });
    }
  }, [router, state]);

  return (
    <div className="w-full">
      <form className="w-full" action={action}>
        <div className="flex w-full flex-col items-center">
          <div className="w-full">
            {products.map((product) => (
              <WriteReviewItem
                key={product.id}
                product={product}
                review={reviews.find(
                  (review) => review.relationships.product?.data?.id === product.id
                )}
                onReviewRatings={({ productId, ratings }) => {
                  updateReview(productId, { ratings });
                }}
                onReviewText={({ productId, text }) => {
                  updateReview(productId, { review: text });
                }}
              />
            ))}
          </div>
          <SubmitButton disabled={!isValid} />
        </div>
      </form>

      <CompleteReviewModal
        open={isModalOpen}
        title={`${reviewPoint}ポイント`}
        onClick={handleButtonClick}
      />
    </div>
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
