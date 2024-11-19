'use client';

import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { formatDateString } from '@/utils/date';
import Image from 'next/image';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  addCommentFeedback,
  addReviewComment,
  addReviewFeedback,
  getReviewComments,
  removeCommentFeedback,
  removeReviewFeedback
} from '../actions';
import { useFeedback } from '../contexts/feedback-context';
import { Review, ReviewCommentWithUser, ReviewCommentsListSchema } from '../types';
import { FeedbackButton } from './feedback-button';
import Rating from './rating';
import { ReviewCommentForm } from './review-comment-form';
import { ReviewCommentListItem } from './review-comment-list-item';

export type ReviewCommentReplyModalRef = {
  open: (review: Review) => void;
  close: () => void;
};

export const ReviewCommentReplyModal = forwardRef<ReviewCommentReplyModalRef>((_, ref) => {
  const { toast } = useToast();
  const {
    feedbackStates,
    feedbackCounts,
    commentFeedbackStates,
    commentFeedbackCounts,
    initializeFeedback,
    initializeCommentFeedbacks,
    updateFeedbackState,
    updateFeedbackCount,
    updateCommentFeedbackState,
    updateCommentFeedbackCount
  } = useFeedback();

  const observerTarget = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState<Review | null>(null);
  const [replyText, setReplyText] = useState('');
  const [comments, setComments] = useState<ReviewCommentWithUser[]>([]);

  // 無限スクロール処理
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && review) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchComments(review.id, nextPage);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, review, page]);

  // フィードバックの初期化
  useEffect(() => {
    if (review) {
      initializeFeedback(review);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [review]);

  // コメントのフィードバックの初期化
  useEffect(() => {
    if (comments.length > 0) {
      initializeCommentFeedbacks(comments);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments]);

  // モーダル開閉時処理
  useImperativeHandle(ref, () => ({
    open: async (review: Review) => {
      setReview(review);
      setIsOpen(true);
      setPage(1);
      setHasMore(true);
      await fetchComments(review.id, 1);
    },
    close: () => {
      setIsOpen(false);
      setReview(null);
      setReplyText('');
      setComments([]);
      setPage(1);
      setHasMore(true);
    }
  }));

  const fetchComments = async (reviewId: string, currentPage: number) => {
    setIsLoading(true);
    try {
      const response = await getReviewComments({
        review_id: reviewId,
        page: currentPage,
        per_page: 10
      });

      const typedResponse = response as unknown as ReviewCommentsListSchema;

      if (currentPage === 1) {
        setComments(typedResponse.data as ReviewCommentWithUser[]);
      } else {
        setComments((prev) => [...prev, ...(typedResponse.data as ReviewCommentWithUser[])]);
      }

      setHasMore(currentPage < (response.meta?.total_pages || 1));
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!review) return;

    const result = await addReviewComment({
      review_id: review.id,
      content: replyText
    });

    if (result.success) {
      toast({ title: result.message });
      setReplyText('');

      setPage(1);
      await fetchComments(review.id, 1);

      setReview((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          attributes: {
            ...prev.attributes,
            review_comments_count: (prev.attributes.review_comments_count || 0) + 1
          }
        };
      });

      // コメント投稿後のスクロール位置を調整する処理
      const scrollArea = document.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollArea) {
        setTimeout(() => {
          scrollArea.scrollTop = scrollArea.scrollHeight;
        }, 100);
      }
    } else {
      toast({
        title: result.message,
        variant: 'destructive'
      });
    }
  };

  // レビューのフィードバックの処理
  const handleFeedbackToggle = async () => {
    if (!review) return;

    const currentState = feedbackStates[review.id] || false;
    const currentCount = feedbackCounts[review.id] || review.attributes.feedback_reviews_count || 0;

    try {
      if (currentState) {
        const feedbackId = review.attributes.feedback_id;
        if (feedbackId) {
          const result = await removeReviewFeedback({ review_id: review.id, id: feedbackId });
          if (result.success) {
            review.attributes.feedback_id = undefined;
            updateFeedbackState(review.id, false);
            updateFeedbackCount(review.id, Math.max(0, currentCount - 1));
            toast({ title: result.message });
          }
        }
      } else {
        const result = await addReviewFeedback({ review_id: review.id });
        if (result.success && result.data?.id) {
          review.attributes.feedback_id = result.data.id;
          updateFeedbackState(review.id, true);
          updateFeedbackCount(review.id, currentCount + 1);
          toast({ title: result.message });
        }
      }
    } catch (error) {
      console.error('Error toggling feedback:', error);
    }
  };

  // コメントのフィードバックの処理
  const handleCommentFeedbackToggle = async (comment: ReviewCommentWithUser) => {
    const currentState = commentFeedbackStates[comment.id] || false;
    const newState = !currentState;
    const currentCount = commentFeedbackCounts[comment.id] || 0;

    try {
      if (newState) {
        const result = await addCommentFeedback({
          review_id: review?.id || '',
          comment_id: comment.id
        });
        if (result.success) {
          updateCommentFeedbackState(comment.id, true);
          updateCommentFeedbackCount(comment.id, currentCount + 1);
          toast({ title: result.message });
        }
      } else {
        const result = await removeCommentFeedback({
          review_id: review?.id || '',
          comment_id: comment.id
        });
        if (result.success) {
          updateCommentFeedbackState(comment.id, false);
          updateCommentFeedbackCount(comment.id, Math.max(0, currentCount - 1));
          toast({ title: result.message });
        }
      }
    } catch (error) {
      console.error('Comment feedback toggle error:', error);
    }
  };

  if (!review) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription>
        <DialogContent className="flex w-11/12 flex-col items-center justify-center md:w-[740px]">
          <Typography as="bold" element="p" className="text-center text-[20px] text-black-90">
            コメント{' '}
            {review.attributes.review_comments_count && review.attributes.review_comments_count > 0
              ? `(${review.attributes.review_comments_count})`
              : ''}
          </Typography>

          <ScrollArea className="h-[400px] w-full">
            {/* メインレビュー */}
            <div className="flex w-full">
              <div className="mr-[8px] flex h-[40px] w-[40px] items-center justify-center rounded-[20px]">
                <Image
                  src={review.user?.avatar?.url || '/placeholder-product-image.png'}
                  alt={review.user?.attributes.nickname ?? '匿名'}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <Typography
                  as="boldSmall"
                  element="p"
                  className="max-w-[200px] overflow-hidden whitespace-normal break-words text-charcoalGray md:hidden"
                >
                  {review.user?.attributes.nickname ?? '匿名'}
                </Typography>
                <div className="flex items-center gap-2">
                  <Typography
                    as="boldSmall"
                    element="p"
                    className="hidden max-w-[200px] overflow-hidden whitespace-normal break-words text-charcoalGray md:block"
                  >
                    {review.user?.attributes.nickname ?? '匿名'}
                  </Typography>
                  <Typography as="small" element="p" className="text-charcoalGray">
                    •
                  </Typography>
                  <Typography as="small" element="p" className="font-normal text-charcoalGray">
                    {formatDateString(review.attributes.created_at)}
                  </Typography>
                  <Typography as="small" element="p" className="text-charcoalGray">
                    •
                  </Typography>
                  <Rating star={review.attributes.rating ?? 0} readOnly />
                </div>
                <Typography
                  as="body"
                  element="p"
                  className="mt-2 max-w-full break-words text-[14px] text-black-90"
                >
                  {review.attributes.review}
                </Typography>
                <div className="mt-[8px]">
                  <FeedbackButton
                    isActive={feedbackStates[review.id] || false}
                    onClick={handleFeedbackToggle}
                    feedbackCount={feedbackCounts[review.id] || 0}
                  />
                </div>
              </div>
            </div>

            {/* コメント一覧 */}
            <div className="mt-4 w-full">
              {comments.length === 0 && isLoading ? (
                <div className="flex justify-center py-4">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <ReviewCommentListItem
                      key={comment.id}
                      comment={comment}
                      isFeedbackActive={commentFeedbackStates[comment.id] || false}
                      onFeedbackToggle={() => handleCommentFeedbackToggle(comment)}
                      feedbackCount={commentFeedbackCounts[comment.id] || 0}
                    />
                  ))}
                  {isLoading && (
                    <div className="flex justify-center py-4">
                      <LoadingSpinner />
                    </div>
                  )}
                  <div ref={observerTarget} className="h-4" />
                </div>
              )}
            </div>
          </ScrollArea>
          <ReviewCommentForm value={replyText} onChange={setReplyText} onSubmit={handleSubmit} />
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
});

ReviewCommentReplyModal.displayName = 'ReviewCommentReplyModal';
