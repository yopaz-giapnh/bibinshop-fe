import { useToast } from '@/components/ui/use-toast';
import { hasProperty } from '@/utils/type';
import {
  addCommentFeedback,
  addReviewFeedback,
  removeCommentFeedback,
  removeReviewFeedback
} from '../actions';
import { Review, ReviewCommentWithUser, ReviewSchema } from '../types';

export function isReviewSchema(includedObject: unknown): includedObject is ReviewSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'review';
}

export const useReviewFeedback = () => {
  const { toast } = useToast();

  // レビューのフィードバックの処理
  const handleFeedbackToggle = async (
    review?: Review,
    onUpdate?: (updatedReview: Review) => void
  ) => {
    if (!review || !review.attributes) return;

    const hasFeedback = !!review.attributes.feedback_id;
    const currentCount = review.attributes.feedback_reviews_count || 0;

    try {
      if (hasFeedback) {
        const feedbackId = review.attributes.feedback_id;
        if (feedbackId) {
          const result = await removeReviewFeedback({ review_id: review.id, id: feedbackId });
          if (result.success) {
            const updatedReview = {
              ...review,
              attributes: {
                ...review.attributes,
                feedback_id: undefined,
                feedback_reviews_count: Math.max(0, currentCount - 1)
              }
            };
            onUpdate?.(updatedReview);
            toast({ title: result.message });
          }
        }
      } else {
        const result = await addReviewFeedback({ review_id: review.id });
        if (result.success && result.data?.id) {
          const updatedReview = {
            ...review,
            attributes: {
              ...review.attributes,
              feedback_id: result.data.id,
              feedback_reviews_count: currentCount + 1
            }
          };
          onUpdate?.(updatedReview);
          toast({ title: result.message });
        }
      }
    } catch (error) {
      console.error('Error toggling feedback:', error);
    }
  };

  // コメントのフィードバックの処理
  const handleCommentFeedbackToggle = async (
    comment: ReviewCommentWithUser,
    reviewId: string,
    onUpdate: (updatedComment: ReviewCommentWithUser) => void
  ) => {
    if (!comment.attributes) return;

    const hasFeedback = !!comment.attributes.helpful_by_current_user;
    const currentCount = comment.attributes.feedback_review_comments_count || 0;

    try {
      if (hasFeedback) {
        const result = await removeCommentFeedback({
          review_id: reviewId,
          comment_id: comment.id
        });
        if (result.success) {
          const updatedComment = {
            ...comment,
            attributes: {
              ...comment.attributes,
              helpful_by_current_user: false,
              feedback_review_comments_count: Math.max(0, currentCount - 1)
            }
          };
          onUpdate(updatedComment);
          toast({ title: result.message });
        }
      } else {
        const result = await addCommentFeedback({
          review_id: reviewId,
          comment_id: comment.id
        });
        if (result.success) {
          const updatedComment = {
            ...comment,
            attributes: {
              ...comment.attributes,
              helpful_by_current_user: true,
              feedback_review_comments_count: currentCount + 1
            }
          };
          onUpdate(updatedComment);
          toast({ title: result.message });
        }
      }
    } catch (error) {
      console.error('Comment feedback toggle error:', error);
    }
  };
  return { handleFeedbackToggle, handleCommentFeedbackToggle };
};
