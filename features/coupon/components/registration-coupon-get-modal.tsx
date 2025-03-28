'use client';

import BibiSmilingFace from '@/assets/bibincban/smiling-face.svg';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CouponSchema } from '../types';
import { CouponCard } from './coupon-card';

type Props = {
  coupon: CouponSchema;
};

export const RegistrationCouponGetModal = ({ coupon }: Props) => {
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
        <DialogHeader className="relative w-full">
          <DialogTitle className="pb-[136px] pt-[8px] text-center md:pb-[120px] md:pt-[24px]">
            <Typography as="bold" element="p">
              おめでとうございます！登録が完了しました！
            </Typography>
            <Typography as="bold" element="p">
              クーポンをゲットしました！
            </Typography>
          </DialogTitle>
          <div className="absolute top-[100px] flex w-full justify-center md:top-[80px]">
            <BibiSmilingFace />
          </div>
          <CouponCard
            title={coupon.attributes.title}
            description={coupon.attributes.description}
            expiresAt={coupon.attributes.expires_at}
            code={coupon.attributes.code}
          />
        </DialogHeader>
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
