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
  const handleFeedbackToggle = async (review?: Review) => {
    if (!review) return;

    const hasFeedback = !!review.attributes.feedback_id;
    const currentCount = review.attributes.feedback_reviews_count || 0;

    try {
      if (hasFeedback) {
        const feedbackId = review.attributes.feedback_id;
        if (feedbackId) {
          const result = await removeReviewFeedback({ review_id: review.id, id: feedbackId });
          if (result.success) {
            review.attributes.feedback_id = undefined;
            review.attributes.feedback_reviews_count = Math.max(0, currentCount - 1);
            toast({ title: result.message });
          }
        }
      } else {
        const result = await addReviewFeedback({ review_id: review.id });
        if (result.success && result.data?.id) {
          review.attributes.feedback_id = result.data.id;
          review.attributes.feedback_reviews_count = currentCount + 1;
          toast({ title: result.message });
        }
      }
    } catch (error) {
      console.error('Error toggling feedback:', error);
    }
  };

  // コメントのフィードバックの処理
  const handleCommentFeedbackToggle = async (comment: ReviewCommentWithUser, reviewId: string) => {
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
          comment.attributes.helpful_by_current_user = false;
          comment.attributes.feedback_review_comments_count = Math.max(0, currentCount - 1);
          toast({ title: result.message });
        }
      } else {
        const result = await addCommentFeedback({
          review_id: reviewId,
          comment_id: comment.id
        });
        if (result.success) {
          comment.attributes.helpful_by_current_user = true;
          comment.attributes.feedback_review_comments_count = currentCount + 1;
          toast({ title: result.message });
        }
      }
    } catch (error) {
      console.error('Comment feedback toggle error:', error);
    }
  };

  return { handleFeedbackToggle, handleCommentFeedbackToggle };
};
