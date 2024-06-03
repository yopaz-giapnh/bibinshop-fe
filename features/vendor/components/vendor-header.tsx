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
      <Image
        src="/vendor-header-image-sample.png"
        className="mb-6"
        width={1300}
        height={300}
        alt={''}
      />
      <div className="ml-4 flex items-center">
        <Image
          src={vendor.vendorImages[0]?.url || require('/public/placeholder-product-image.png')}
          width={82}
          height={82}
          alt={''}
        />
        <div className="ml-3">
          <Typography as="title" element="h1" className="text-black-90">
            {vendor.attributes.name}
          </Typography>
          <Rating star={4.5} size={16} withLabel readOnly count={34} />
        </div>
      </div>
    </div>
  );
}
