'use client';

import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { formatDateString } from '@/utils/date';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { addReviewComment, getReviewComments } from '../actions';
import { Review, ReviewCommentWithUser } from '../types';
import { useReviewFeedback } from '../utils';
import { FeedbackButton } from './feedback-button';
import Rating from './rating';
import { ReviewCommentForm } from './review-comment-form';
import { ReviewCommentListItem } from './review-comment-list-item';
import { ReviewCommentListSkeleton } from './skeletons/review-comment-list-item-skeleton';

export type ReviewCommentReplyModalRef = {
  review?: Review;
  open: (review: Review) => void;
  close: () => void;
};

type Props = {
  onReviewUpdate?: (updatedReview: Review) => void;
};

export const ReviewCommentReplyModal = forwardRef<ReviewCommentReplyModalRef, Props>(
  ({ onReviewUpdate }, ref) => {
    const { toast } = useToast();
    const { handleFeedbackToggle, handleCommentFeedbackToggle } = useReviewFeedback();
    const observerTarget = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [review, setReview] = useState<Review | null>(null);
    const [replyText, setReplyText] = useState('');
    const [comments, setComments] = useState<ReviewCommentWithUser[]>([]);

    const avatarUrl = review?.avatar
      ? review.avatar.attributes?.styles?.[review.avatar.attributes.styles.length - 1]?.url
      : undefined;

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

        if (currentPage === 1) {
          setComments(response.data || []);
        } else {
          setComments((prev) => [...prev, ...(response.data || [])]);
        }

        setHasMore(currentPage < (response.meta?.total_pages || 1));
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // コメント投稿処理
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

    // コメントのフィードバックの処理
    const handleReviewFeedback = () => {
      if (!review) return;
      handleFeedbackToggle(review, (updatedReview) => {
        setReview(updatedReview);
        onReviewUpdate?.(updatedReview);
      });
    };

    // コメントのフィードバックの処理
    const handleCommentFeedback = async (comment: ReviewCommentWithUser) => {
      if (!review) return;
      await handleCommentFeedbackToggle(comment, review.id, (updatedComment) => {
        setComments((prevComments) =>
          prevComments.map((c) => (c.id === updatedComment.id ? updatedComment : c))
        );
      });
    };

    if (!review) return null;

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogDescription>
          <DialogContent className="flex w-11/12 flex-col items-center justify-center md:w-[740px]">
            <Typography as="bold" element="p" className="text-center text-[20px] text-black-90">
              コメント{' '}
              {review.attributes.review_comments_count &&
              review.attributes.review_comments_count > 0
                ? `(${review.attributes.review_comments_count})`
                : ''}
            </Typography>

            <ScrollArea className="h-[400px] w-full">
              {/* メインレビュー */}
              <div className="flex w-full">
                <Link
                  className="mr-[8px] h-[40px] w-[40px] flex-shrink-0 rounded-[20px] border border-gray-200"
                  href={`/user-detail/${review?.user?.attributes.unique_key}`}
                >
                  <Image
                    src={avatarUrl || '/placeholder-product-image.png'}
                    alt={review.user?.attributes.nickname ?? '匿名'}
                    width={40}
                    height={40}
                    className="h-[40px] w-[40px] rounded-full object-cover"
                  />
                </Link>
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
                      isActive={!!review.attributes.feedback_id}
                      onClick={handleReviewFeedback}
                      feedbackCount={review.attributes.feedback_reviews_count || 0}
                    />
                  </div>
                </div>
              </div>

              {/* コメント一覧 */}
              <div className="mt-4 w-full">
                {comments.length === 0 && isLoading ? (
                  <div className="flex justify-center py-4">
                    <ReviewCommentListSkeleton />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <ReviewCommentListItem
                        key={comment.id}
                        comment={comment}
                        isFeedbackActive={!!comment.attributes?.helpful_by_current_user}
                        onFeedbackToggle={() => handleCommentFeedback(comment)}
                        feedbackCount={comment.attributes?.feedback_review_comments_count || 0}
                      />
                    ))}
                    {isLoading && (
                      <div className="flex justify-center py-4">
                        <ReviewCommentListSkeleton />
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
  }
);

ReviewCommentReplyModal.displayName = 'ReviewCommentReplyModal';
