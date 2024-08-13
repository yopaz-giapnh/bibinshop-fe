'use client';

import BibiSmilingFace from '@/assets/bibincban/smiling-face.svg';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { SortedLineItemGroup } from '@/features/account/order-history/constants';
import { extractSlugs } from '@/features/order/utils';
import Link from 'next/link';
import { forwardRef, useImperativeHandle, useState } from 'react';

export type TryReviewWriteModalRef = {
  open: (shipmentId: string) => void;
  close: () => void;
};

type TryReviewWriteModalProps = {
  sortedLineItems: SortedLineItemGroup[];
};

export const TryReviewWriteModal = forwardRef<TryReviewWriteModalRef, TryReviewWriteModalProps>(
  ({ sortedLineItems }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);

    const handleOnClickYes = () => {
      setIsOpen(false);
    };

    useImperativeHandle(ref, () => ({
      open: (shipmentId: string) => {
        setSelectedShipmentId(shipmentId);
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      }
    }));

    const selectedGroup = sortedLineItems.find(
      (group) => group.items[0]?.id === selectedShipmentId
    );

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="flex w-11/12 flex-col items-center justify-center md:w-[540px]">
          <Typography as="bold" element="p" className="pb-[24px] text-[20px] text-black-90">
            ご評価ありがとうございます！
            <Typography as="bold" element="p" className="text-[20px] text-black-90">
              レビューを書いてみませんか？
            </Typography>
          </Typography>
          <BibiSmilingFace />
          {selectedGroup && (
            <div className="mt-4 w-full">
              <Typography as="bold" element="p" className="mb-2 text-[16px] text-black-90">
                この配送グループの商品：
              </Typography>
              <ul className="list-inside list-disc">
                {selectedGroup.items.map((item) => (
                  <li key={item.id} className="text-[14px] text-black-70">
                    {item.attributes.name} (数量: {item.attributes.quantity})
                  </li>
                ))}
              </ul>
            </div>
          )}
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
            {selectedGroup && (
              <Link
                href={`/account/orders/write-review?${extractSlugs([selectedGroup])
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
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

TryReviewWriteModal.displayName = 'TryReviewWriteModal';
