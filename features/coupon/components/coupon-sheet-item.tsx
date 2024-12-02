import { RadioGroupItem } from '@/components/ui/radio-group';
import { Typography } from '@/components/ui/typography';
import { Ban } from 'lucide-react';
import Image from 'next/image';
import { CouponSchema } from '../types';

interface CouponSheetItemProps {
  coupon: CouponSchema;
  cartTotal?: string;
}

export const CouponSheetItem: React.FC<CouponSheetItemProps> = ({ coupon, cartTotal }) => {
  const isSelectable = cartTotal
    ? Number(cartTotal) >= Number(coupon.attributes.minimum_total)
    : false;

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between">
        {isSelectable ? (
          <RadioGroupItem value={coupon.id} id={coupon.id} className="mr-2 mt-2 h-4 w-4" />
        ) : (
          <Ban className="mr-2 h-9 w-9 text-gray-400" />
        )}
        <div className="flex flex-col items-start">
          <div className="flex items-center">
            <div className="relative">
              <Image
                src="/small-coupon-background.png"
                alt="Coupon Background"
                width={540}
                height={200}
                style={{
                  objectFit: 'cover'
                }}
              />
              <div className="absolute inset-0 ml-3 flex items-center">
                <Typography
                  as="caption"
                  element="p"
                  className="text-black-90"
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {coupon.attributes.title}
                </Typography>
              </div>
            </div>
          </div>
          {!isSelectable && (
            <Typography as="caption" element="p" className="pt-1 text-[12px] text-red-500">
              {`${coupon.attributes.minimum_total.toLocaleString()}円以上のお買い物で使用可能`}
            </Typography>
          )}
          <Typography as="caption" element="p" className="pt-2 text-[14px] text-gray-500">
            {coupon.attributes.description}
          </Typography>
        </div>
      </div>
    </div>
  );
};
