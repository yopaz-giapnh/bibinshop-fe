'use client';

import BibiVacantFace from '@/assets/bibincban/vacant-face.svg';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { CouponCard } from './coupon-card';

export type FirstCouponGetModalRef = {
  open: () => void;
  close: () => void;
};

export const FirstCouponGetModal = forwardRef<FirstCouponGetModalRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        hideCloseButton={true}
        className="flex w-11/12 flex-col items-center px-[8px] pt-[8px] md:w-[540px]"
      >
        <div className="relative w-full">
          <Typography
            as="bold"
            element="p"
            className="pb-[136px] pt-[8px] text-center md:pb-[120px] md:pt-[24px] "
          >
            クーポンをゲット！
          </Typography>
          <div className="absolute top-[60px] flex w-full justify-center md:top-[60px]">
            <BibiVacantFace />
          </div>
          {/* TODO: これも？ */}
          <CouponCard
            title="[APPダウンロード]1,000円 OFF"
            description="7,000円以上購入で使用可能(特価商品を除く)"
            expiresAt="2024年10月31日まで"
            code="BIBINSHOP2024"
          />
        </div>
        <div className="w-4/5">
          <Link href="/signup" passHref>
            <Button
              variant="default"
              className="mt-[16px] w-full md:mt-[24px]"
              onClick={() => setIsOpen(false)}
            >
              クーポンをゲット！
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
});

FirstCouponGetModal.displayName = 'FirstCouponGetModal';
