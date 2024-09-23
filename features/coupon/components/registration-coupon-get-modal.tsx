'use client';

import BibiSmilingFace from '@/assets/bibincban/smiling-face.svg';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CouponCard } from './coupon-card';

export const RegistrationCouponGetModal = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get('registration') === 'complete') {
      setIsOpen(true);
    }
  }, [searchParams]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (open) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
          router.replace('/');
        }
      }}
    >
      <DialogContent
        hideCloseButton={true}
        className="flex w-11/12 flex-col items-center px-[8px] pt-[8px] md:w-[540px]"
      >
        <div className="relative w-full">
          <div className="pb-[136px] pt-[8px] text-center md:pb-[120px] md:pt-[24px] ">
            <Typography as="bold" element="p">
              おめでとうございます！登録が完了しました！
            </Typography>
            <Typography as="bold" element="p">
              クーポンをゲットしました！
            </Typography>
          </div>
          <div className="absolute top-[100px] flex w-full justify-center md:top-[80px]">
            <BibiSmilingFace />
          </div>
          {/* TODO: 初回登録クーポンどうするか？ */}
          <CouponCard
            title="[APPダウンロード]1,000円 OFF"
            description="初回登録限定クーポン"
            expiresAt="2024年12月31日まで"
            code="BIBINSHOP2024"
          />
        </div>
        <div className="w-4/5">
          <Button
            variant="default"
            className="mt-[16px] w-full md:mt-[24px]"
            onClick={() => setIsOpen(false)}
          >
            今すぐ買い物へ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
