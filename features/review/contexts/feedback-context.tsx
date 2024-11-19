import { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { Review, ReviewCommentWithUser } from '../types';

type FeedbackContextType = {
  feedbackStates: { [key: string]: boolean };
  feedbackCounts: { [key: string]: number };
  commentFeedbackStates: { [key: string]: boolean };
  commentFeedbackCounts: { [key: string]: number };
  initializeFeedbacks: (reviews: Review[]) => void;
  initializeFeedback: (review: Review) => void;
  initializeCommentFeedbacks: (comments: ReviewCommentWithUser[]) => void;
  updateFeedbackState: (reviewId: string, isActive: boolean) => void;
  updateFeedbackCount: (reviewId: string, count: number) => void;
  updateCommentFeedbackState: (commentId: string, isActive: boolean) => void;
  updateCommentFeedbackCount: (commentId: string, count: number) => void;
};

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [feedbackStates, setFeedbackStates] = useState<{ [key: string]: boolean }>({});
  const [feedbackCounts, setFeedbackCounts] = useState<{ [key: string]: number }>({});
  const [commentFeedbackStates, setCommentFeedbackStates] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [commentFeedbackCounts, setCommentFeedbackCounts] = useState<{ [key: string]: number }>({});

  const initializeFeedbacks = useCallback((reviews: Review[]) => {
    const initialStates = reviews.reduce(
      (acc, review) => {
        acc[review.id] = !!review.attributes.feedback_id;
        return acc;
      },
      {} as { [key: string]: boolean }
    );

    const initialCounts = reviews.reduce(
      (acc, review) => {
        acc[review.id] = review.attributes.feedback_reviews_count || 0;
        return acc;
      },
      {} as { [key: string]: number }
    );

    setFeedbackStates(initialStates);
    setFeedbackCounts(initialCounts);
  }, []);

  const initializeFeedback = useCallback((review: Review) => {
    setFeedbackStates((prev) => ({
      ...prev,
      [review.id]: !!review.attributes.feedback_id
    }));
    setFeedbackCounts((prev) => ({
      ...prev,
      [review.id]: review.attributes.feedback_reviews_count || 0
    }));
  }, []);

  const initializeCommentFeedbacks = useCallback((comments: ReviewCommentWithUser[]) => {
    const initialStates = comments.reduce(
      (acc, comment) => {
        acc[comment.id] = !!comment.attributes?.helpful_by_current_user;
        return acc;
      },
      {} as { [key: string]: boolean }
    );

    const initialCounts = comments.reduce(
      (acc, comment) => {
        acc[comment.id] = comment.attributes?.feedback_review_comments_count || 0;
        return acc;
      },
      {} as { [key: string]: number }
    );

    setCommentFeedbackStates(initialStates);
    setCommentFeedbackCounts(initialCounts);
  }, []);

  const updateFeedbackState = useCallback((reviewId: string, isActive: boolean) => {
    setFeedbackStates((prev) => ({ ...prev, [reviewId]: isActive }));
  }, []);

  const updateFeedbackCount = useCallback((reviewId: string, count: number) => {
    setFeedbackCounts((prev) => ({ ...prev, [reviewId]: count }));
  }, []);

  const updateCommentFeedbackState = useCallback((commentId: string, isActive: boolean) => {
    setCommentFeedbackStates((prev) => ({ ...prev, [commentId]: isActive }));
  }, []);

  const updateCommentFeedbackCount = useCallback((commentId: string, count: number) => {
    setCommentFeedbackCounts((prev) => ({ ...prev, [commentId]: count }));
  }, []);

  return (
    <FeedbackContext.Provider
      value={{
        feedbackStates,
        feedbackCounts,
        commentFeedbackStates,
        commentFeedbackCounts,
        initializeFeedbacks,
        initializeFeedback,
        initializeCommentFeedbacks,
        updateFeedbackState,
        updateFeedbackCount,
        updateCommentFeedbackState,
        updateCommentFeedbackCount
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
}
