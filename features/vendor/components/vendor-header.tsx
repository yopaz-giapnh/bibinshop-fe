import { Typography } from '@/components/ui/typography';
import Rating from '@/features/review/components/rating';
import Image from 'next/image';
import { Vendor } from '../types';

type VendorHeaderProps = {
  vendor: Vendor;
};

/**
 * ベンダーページヘッダーコンポーネント
 * @returns JSX.Element
 */
export function VendorHeader({ vendor }: VendorHeaderProps) {
  return (
    <div className=" my-6 flex flex-col">
      {/* TODO: image のサイズどうするか */}
      <div className="relative h-[300px] w-full">
        <Image
          src={vendor.vendorBannerImage?.url || ''}
          className="mb-6"
          layout="fill"
          objectFit="cover"
          alt={vendor.attributes.name || ''}
        />
      </div>
      <div className="ml-4 flex items-center">
        <Image
          src={vendor.vendorImage?.url || '/placeholder-product-image.png'}
          width={82}
          height={82}
          alt={vendor.attributes.name || ''}
        />
        <div className="ml-3">
          <Typography as="title" element="h1" className="text-black-90">
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
