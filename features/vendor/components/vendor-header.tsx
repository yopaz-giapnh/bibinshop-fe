'use client';

import { Typography } from '@/components/ui/typography';
import Rating from '@/features/review/components/rating';
import { useIsPc } from '@/hooks/use-is-pc';
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
  const isPc = useIsPc();

  return (
    <div className="flex flex-col md:my-6">
      {/* TODO: image のサイズどうするか */}
      <div className="relative h-[300px] w-full">
        <Image
          src={getVendorBannerImageUrl(vendor.vendorBannerImage)}
          className="mb-6"
          layout="fill"
          objectFit="cover"
          alt={vendor.attributes.name || ''}
        />
      </div>
      <div className="mt-2 flex w-full items-center rounded-[8px] border-2 md:mt-5 md:border-none">
        <Image
          src={vendor.vendorImage?.url || '/placeholder-product-image.png'}
          width={isPc ? 82 : 40}
          height={isPc ? 82 : 40}
          alt={vendor.attributes.name || ''}
          className="m-4 md:my-0 md:ml-0 md:mr-4"
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
