import { Typography } from '@/components/ui/typography';
import Rating from '@/features/review/components/rating';
import Image from 'next/image';
import { Vendor } from '../types';
import { getVendorBannerImageUrl } from '../utils';

type VendorHeaderProps = {
  vendor: Vendor;
};

/**
 * ベンダーページヘッダーコンポーネント
 * @returns JSX.Element
 */
export function VendorHeader({ vendor }: VendorHeaderProps) {
  return (
    <div className="flex flex-col md:my-6">
      <div className="relative w-full">
        <div className="relative w-full pb-[21.8%]">
          <Image
            src={getVendorBannerImageUrl(vendor.vendorBannerImage)}
            className="absolute inset-0 h-full w-full object-cover"
            fill
            priority
            alt={vendor.attributes.name || ''}
          />
        </div>
      </div>
      <div className="mt-2 flex w-full items-center rounded-[8px] border-2 md:mt-5 md:border-none">
        <Image
          src={vendor.vendorImage?.url || '/placeholder-product-image.png'}
          width={82}
          height={82}
          alt={vendor.attributes.name || ''}
          className="m-4 aspect-square w-[40px] object-cover object-center md:my-0 md:ml-0 md:mr-4 md:w-[82px]"
        />
        <div className="my-4">
          <Typography as="title" element="h1" className="text-[14px] text-black-90 md:text-[24px]">
            {vendor.attributes.name}
          </Typography>
          {vendor.attributes.stars != null && (
            <Rating
              star={vendor.attributes.stars}
              size={16}
              withLabel
              readOnly
              count={vendor.attributes.reviews_count}
            />
          )}
        </div>
      </div>
    </div>
  );
}
