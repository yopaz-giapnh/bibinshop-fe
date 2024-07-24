'use client';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription } from '@/components/ui/dialog';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { Dialog } from '@radix-ui/react-dialog';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

export type OrderTrackerModalRef = {
  open: (trackingNumber: string) => void;
  close: () => void;
};

export const OrderTrackerModal = forwardRef<OrderTrackerModalRef>((_, ref) => {
  const ordertrackerID = process.env.NEXT_PUBLIC_ORDERTRACKER_ID;
  const [isOpen, setIsOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState<string | undefined>();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    if (!window.Ordertracker) {
      const script = document.createElement('script');
      script.src = 'https://www.ordertracker.com/sdk.js';
      script.async = true;
      script.onload = () => {
        setIsScriptLoaded(true);
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    } else {
      setIsScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen && isScriptLoaded && trackingNumber) {
      const initializeOrderTracker = async () => {
        try {
          if (ordertrackerID && trackingNumber) {
            window
              .Ordertracker({
                id: ordertrackerID,
                trackingNumber: trackingNumber
              })
              .render('#ordertracker-widget');
          }
        } catch (error) {
          console.error('OrderTracker初期化エラー:', error);
        }
      };

      const timer = setTimeout(initializeOrderTracker, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen, isScriptLoaded, ordertrackerID, trackingNumber]);

  useEffect(() => {
    if (isOpen) {
      setShowSpinner(true);
      const timer = setTimeout(() => {
        setShowSpinner(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useImperativeHandle(ref, () => ({
    open: (newTrackingNumber: string) => {
      setTrackingNumber(newTrackingNumber);
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    }
  }));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription>
        <DialogContent className="flex max-h-[80vh] w-11/12 flex-col items-center justify-center md:w-[540px]">
          <Typography as="bold" element="p" className="mb-4 text-[20px] text-black-90">
            配送情報
          </Typography>
          {isOpen && (
            <>
              <div
                id="ordertracker-widget"
                className="min-h-[100px] w-full flex-grow items-center justify-center overflow-y-auto"
              ></div>
              {showSpinner && (
                <div className="absolute items-center justify-center">
                  <LoadingSpinner />
                </div>
              )}
            </>
          )}
          <Button
            className="mt-4 h-[48px] w-[150px] md:h-[55px] md:w-[200px]"
            size="lg"
            variant="lg"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            <Typography as="bold" element="p" className="text-white-base">
              閉じる
            </Typography>
          </Button>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
});

OrderTrackerModal.displayName = 'OrderTrackerModal';
