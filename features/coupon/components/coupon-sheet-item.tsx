import { RadioGroupItem } from '@/components/ui/radio-group';
import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import { CouponSchema } from '../types';

interface CouponSheetItemProps {
  coupon: CouponSchema;
}

export const CouponSheetItem: React.FC<CouponSheetItemProps> = ({ coupon }) => {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <RadioGroupItem value={coupon.id} id={coupon.id} className="w-15 mr-2 h-5" />
            {/* TODO: 最低金額の実装してから */}
            {/* {coupon.isSelectable ? (
              <RadioGroupItem value={coupon.id} id={coupon.id} className="w-15 mr-2 h-5" />
            ) : (
              <Ban className="mr-2 h-9 w-9 text-gray-400" />
            )} */}
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
              <div className="absolute inset-0 ml-4 flex items-center">
                <Typography as="caption" element="p" className="text-black-90">
                  {coupon.attributes.title}
                </Typography>
              </div>
            </div>
          </div>
          <Typography as="caption" element="p" className="pt-2 text-[14px] text-gray-500">
            {coupon.attributes.description}
          </Typography>
        </div>
      </div>
    </div>
  );
};
