import { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { Review, ReviewCommentWithUser } from '../types';

type FeedbackState = {
  reviews: {
    [key: string]: {
      isActive: boolean;
      count: number;
    };
  };
  comments: {
    [key: string]: {
      isActive: boolean;
      count: number;
    };
  };
};

type FeedbackContextType = {
  feedback: {
    reviews: {
      states: { [key: string]: boolean };
      counts: { [key: string]: number };
    };
    comments: {
      states: { [key: string]: boolean };
      counts: { [key: string]: number };
    };
  };
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
  const [feedbackState, setFeedbackState] = useState<FeedbackState>({
    reviews: {},
    comments: {}
  });

  const initializeFeedbacks = useCallback((reviews: Review[]) => {
    setFeedbackState((prev) => ({
      ...prev,
      reviews: reviews.reduce(
        (acc, review) => ({
          ...acc,
          [review.id]: {
            isActive: !!review.attributes.feedback_id,
            count: review.attributes.feedback_reviews_count || 0
          }
        }),
        {}
      )
    }));
  }, []);

  const initializeFeedback = useCallback((review: Review) => {
    setFeedbackState((prev) => ({
      ...prev,
      reviews: {
        ...prev.reviews,
        [review.id]: {
          isActive: !!review.attributes.feedback_id,
          count: review.attributes.feedback_reviews_count || 0
        }
      }
    }));
  }, []);

  const initializeCommentFeedbacks = useCallback((comments: ReviewCommentWithUser[]) => {
    setFeedbackState((prev) => ({
      ...prev,
      comments: comments.reduce(
        (acc, comment) => ({
          ...acc,
          [comment.id]: {
            isActive: !!comment.attributes?.helpful_by_current_user,
            count: comment.attributes?.feedback_review_comments_count || 0
          }
        }),
        {}
      )
    }));
  }, []);

  const updateFeedbackState = useCallback((reviewId: string, isActive: boolean) => {
    setFeedbackState((prev) => ({
      ...prev,
      reviews: {
        ...prev.reviews,
        [reviewId]: {
          ...prev.reviews[reviewId],
          isActive
        }
      }
    }));
  }, []);

  const updateFeedbackCount = useCallback((reviewId: string, count: number) => {
    setFeedbackState((prev) => ({
      ...prev,
      reviews: {
        ...prev.reviews,
        [reviewId]: {
          ...prev.reviews[reviewId],
          count
        }
      }
    }));
  }, []);

  const updateCommentFeedbackState = useCallback((commentId: string, isActive: boolean) => {
    setFeedbackState((prev) => ({
      ...prev,
      comments: {
        ...prev.comments,
        [commentId]: {
          ...prev.comments[commentId],
          isActive
        }
      }
    }));
  }, []);

  const updateCommentFeedbackCount = useCallback((commentId: string, count: number) => {
    setFeedbackState((prev) => ({
      ...prev,
      comments: {
        ...prev.comments,
        [commentId]: {
          ...prev.comments[commentId],
          count
        }
      }
    }));
  }, []);

  const feedbackStates = Object.fromEntries(
    Object.entries(feedbackState.reviews).map(([key, value]) => [key, value.isActive])
  );
  const feedbackCounts = Object.fromEntries(
    Object.entries(feedbackState.reviews).map(([key, value]) => [key, value.count])
  );
  const commentFeedbackStates = Object.fromEntries(
    Object.entries(feedbackState.comments).map(([key, value]) => [key, value.isActive])
  );
  const commentFeedbackCounts = Object.fromEntries(
    Object.entries(feedbackState.comments).map(([key, value]) => [key, value.count])
  );

  return (
    <FeedbackContext.Provider
      value={{
        feedback: {
          reviews: {
            states: feedbackStates,
            counts: feedbackCounts
          },
          comments: {
            states: commentFeedbackStates,
            counts: commentFeedbackCounts
          }
        },
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
