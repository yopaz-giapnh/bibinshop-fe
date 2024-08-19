'use client';

import { Typography } from '@/components/ui/typography';
import Image from 'next/image';

interface CouponCardProps {
  showLabel: boolean;
  label?: string;
  title: string;
  subtitle: string;
  validUntil: string;
  couponCode: string;
}

export const CouponCard: React.FC<CouponCardProps> = ({
  showLabel,
  label,
  title,
  subtitle,
  validUntil,
  couponCode
}) => {
  return (
    <div className="relative">
      <Image
        src="/coupon-background.png"
        alt="Coupon"
        width={540}
        height={200}
        style={{
          objectFit: 'cover'
        }}
      />
      {showLabel && (
        <div className="absolute left-0 top-0 bg-bibinBlue-100 px-[9px] pb-[2px]">
          <Typography
            as="boldSmall"
            element="p"
            className="mt-1 text-center text-[12px] text-white-base md:mt-2"
          >
            {label}
          </Typography>
        </div>
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <div className="absolute left-1/2 top-6 flex w-11/12 -translate-x-1/2 transform flex-col items-start md:bottom-3 md:top-10">
          <Typography
            as="bold"
            element="p"
            className="text-center text-[18px] text-bibinViolet-100 md:text-[24px]"
          >
            {title}
          </Typography>
          <Typography as="caption" element="p" className="mt-1 text-center text-[14px] md:mt-2">
            {subtitle}
          </Typography>
        </div>
        <div className="absolute bottom-16 left-1/2 flex w-10/12 -translate-x-1/2 transform flex-col items-center border-t border-dashed border-bibinBlue-100 md:bottom-28 md:w-11/12" />
        <div className="absolute bottom-2 left-1/2 flex w-11/12 -translate-x-1/2 transform flex-col items-start md:bottom-6">
          <Typography as="caption" element="p" className="text-center text-[12px]">
            {validUntil}
          </Typography>
          <div className="border-1 mt-[2px] flex w-full items-center justify-center rounded-md bg-white-base p-1 md:p-2">
            <Typography as="boldSmall" element="p" className="text-center text-gray-500">
              コード：
            </Typography>
            <Typography as="boldSmall" element="p" className="text-center">
              {couponCode}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
