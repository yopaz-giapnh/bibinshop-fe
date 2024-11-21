'use client';

import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Review } from '../types';
import { ReviewListWithAvator } from './review-list-with-avator';

export type AllReviewListModalRef = {
  open: () => void;
  close: () => void;
};

type Props = {
  reviews: Review[];
  reviewsCount: number;
};

export const AllReviewListModal = forwardRef<AllReviewListModalRef, Props>(
  ({ reviews, reviewsCount }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      }
    }));

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogDescription>
          <DialogContent className="flex w-11/12 flex-col items-center justify-center md:w-[740px]">
            <Typography as="bold" element="p" className="text-center text-[20px] text-black-90">
              レビュー({reviewsCount})
            </Typography>

            <ScrollArea className="h-[600px] w-full">
              <ReviewListWithAvator reviews={reviews} />
            </ScrollArea>
          </DialogContent>
        </DialogDescription>
      </Dialog>
    );
  }
);

AllReviewListModal.displayName = 'AllReviewListModal';
