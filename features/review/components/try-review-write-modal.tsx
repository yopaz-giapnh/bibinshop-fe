'use client';

import BibiSmilingFace from '@/assets/bibincban/smiling-face.svg';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { Order } from '@/features/order/types';
import { Dialog } from '@radix-ui/react-dialog';
import Link from 'next/link';
import { forwardRef, useImperativeHandle, useState } from 'react';

export type TryReviewWriteModalRef = {
  open: (email: string) => void;
  close: () => void;
};

type SortedLineItems = {
  [key: string]: Order['lineItems'];
};

type TryReviewWriteModalProps = {
  sortedLineItems: SortedLineItems;
};

export const TryReviewWriteModal = forwardRef<TryReviewWriteModalRef, TryReviewWriteModalProps>(
  ({ sortedLineItems }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOnClickYes = () => {
      setIsOpen(false);
    };

    const extractSlugs = (items: SortedLineItems) => {
      return Object.entries(items)
        .filter(([state]) => state === 'shipped' || state === 'delivered')
        .flatMap(([, lineItems]) => lineItems.map((item) => item.attributes.slug));
    };

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
          <DialogContent className="flex w-11/12 flex-col items-center justify-center md:w-[540px]">
            <Typography as="bold" element="p" className="pb-[24px] text-[20px] text-black-90">
              ご評価ありがとうございます！
              <Typography as="bold" element="p" className="text-[20px] text-black-90">
                レビューを書いてみませんか？
              </Typography>
            </Typography>
            <BibiSmilingFace />
            <div className="flex gap-2 pt-[24px]">
              <Button
                className="h-[48px] w-[150px] border border-bibinBlue-100 bg-white-base md:h-[55px] md:w-[200px]"
                size="lg"
                variant="lg"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <Typography as="bold" element="p" className="text-bibinBlue-100">
                  あとで書く
                </Typography>
              </Button>
              <Link
                href={`/account/orders/write-review?${extractSlugs(sortedLineItems)
                  .map((slug) => `slug=${slug}`)
                  .join('&')}`}
                passHref
              >
                <Button
                  className="h-[48px] w-[150px] md:h-[55px] md:w-[200px]"
                  size="lg"
                  variant="lg"
                  onClick={handleOnClickYes}
                  type="button"
                >
                  <Typography as="bold" element="p" className="text-white-base">
                    レビューを書く
                  </Typography>
                </Button>
              </Link>
            </div>
          </DialogContent>
        </DialogDescription>
      </Dialog>
    );
  }
);

TryReviewWriteModal.displayName = 'TryReviewWriteModal';
