'use client';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import { ReviewStars } from './review-stars';

export function ShopCard() {
  return (
    <div className="flex w-fit gap-[10px] rounded-[6px] border border-black-10 bg-white-base p-4">
      <div className="inline-flex items-center gap-[16px]">
        <Image
          className="h-[82px] w-[82px] object-cover"
          alt="ショップ名"
          width={82}
          height={82}
          src="/shop.png"
        />
        <div className="flex flex-col gap-[8px]">
          <div className="inline-flex items-center justify-center gap-[8px] pr-7">
            <Typography as="bold" element="p" className="text-text-100">
              ドクターディエット公式
            </Typography>
            <ReviewStars reviewCount={5} viewSize={16} starSize={12} />
            <Typography as="xSmall" element="p" className="text-text-80">
              4.1 (188)
            </Typography>
          </div>
          <Button className="flex h-[40px] w-[211px] items-center border border-bibinBlue-100 bg-white-base p-[8px]">
            <Typography as="boldSmall" element="p" className="text-bibinBlue-100">
              全ての商品を見る(361)
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}
