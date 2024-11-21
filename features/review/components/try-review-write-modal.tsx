'use client';

import BibiSmilingFace from '@/assets/bibincban/smiling-face.svg';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { SortedLineItemGroup } from '@/features/account/order-history/constants';
import { Order } from '@/features/order/types';
import { extractSlugs } from '@/features/order/utils';
import Link from 'next/link';
import { forwardRef, useImperativeHandle, useState } from 'react';

export type TryReviewWriteModalRef = {
  open: (shipmentId: string) => void;
  close: () => void;
};

type TryReviewWriteModalProps = {
  sortedLineItems: SortedLineItemGroup[];
  order: Order;
};

export const TryReviewWriteModal = forwardRef<TryReviewWriteModalRef, TryReviewWriteModalProps>(
  ({ sortedLineItems, order }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      open: (shipmentId: string) => {
        console.log('Opening modal with shipmentId:', shipmentId);
        setSelectedShipmentId(shipmentId);
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
        setSelectedShipmentId(null);
      }
    }));

    const selectedGroup = sortedLineItems.find((group) => {
      return group.items.some((item) => {
        const shipment = order.shipments.find((s) =>
          s.relationships.line_items?.data?.some((li) => li?.id === item.id)
        );
        return shipment?.id === selectedShipmentId;
      });
    });

    const groupSlugs = selectedGroup
      ? extractSlugs([selectedGroup]).filter((slug): slug is string => slug !== undefined)
      : [];

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
              href={`/account/orders/write-review?${groupSlugs.map((slug) => `slug=${slug}`).join('&')}`}
              passHref
            >
              <Button
                className="h-[48px] w-[150px] md:h-[55px] md:w-[200px]"
                size="lg"
                variant="lg"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <Typography as="bold" element="p" className="text-white-base">
                  レビューを書く
                </Typography>
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

TryReviewWriteModal.displayName = 'TryReviewWriteModal';
