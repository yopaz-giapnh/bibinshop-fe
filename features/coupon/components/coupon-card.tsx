import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import { formatExpirationDate } from '../utiles';

interface CouponCardProps {
  title: string;
  description: string;
  expiresAt?: string;
  code: string;
}

export const CouponCard: React.FC<CouponCardProps> = ({ title, description, expiresAt, code }) => {
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
      {/* TODO: BE 実装後(使用決めてから？) */}
      {/* {showLabel && (
        <div className="absolute left-0 top-0 bg-bibinBlue-100 px-[9px] pb-[2px]">
          <Typography
            as="boldSmall"
            element="p"
            className="mt-1 text-center text-[12px] text-white-base md:mt-2"
          >
            {label}
          </Typography>
        </div>
      )} */}
      <div className="absolute inset-0 flex flex-col items-center justify-between p-4">
        <div className="mt-[20px] flex w-11/12 flex-col items-start">
          <Typography
            as="bold"
            element="p"
            className="text-center text-[18px] text-bibinViolet-100 md:text-[24px]"
          >
            {title}
          </Typography>
          <Typography as="caption" element="p" className="mt-1 text-center text-[14px] md:mt-2">
            {description}
          </Typography>
        </div>
        <div className="flex w-11/12 flex-col items-center border-t border-dashed border-bibinBlue-100" />
        <div className="flex w-11/12 flex-col items-start md:bottom-6">
          {expiresAt && (
            <Typography as="caption" element="p" className="text-center text-[12px]">
              {formatExpirationDate(expiresAt)}
            </Typography>
          )}
          <div className="border-1 mt-[2px] flex w-full items-center justify-center rounded-md bg-white-base p-1 md:p-2">
            <Typography as="boldSmall" element="p" className="text-center text-gray-500">
              コード：
            </Typography>
            <Typography as="boldSmall" element="p" className="text-center">
              {code}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
