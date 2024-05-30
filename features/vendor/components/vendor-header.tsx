import { Typography } from '@/components/ui/typography';
import Rating from '@/features/review/components/rating';
import Image from 'next/image';

type VendorHeaderProps = {
  imageUrl: string;
  vendorName: string;
  star: number;
  count: number;
};

/**
 * ベンダーページヘッダーコンポーネント
 * @returns JSX.Element
 */
export function VendorHeader({ imageUrl, vendorName, star, count }: VendorHeaderProps) {
  return (
    <div className=" my-6 flex flex-col">
      {/* TODO: image のサイズどうするか */}
      <Image src={imageUrl} className="mb-6" width={1300} height={300} alt={''} />
      <div className="ml-4 flex items-center">
        <Image src={'/vendor-icon-sample.png'} width={82} height={82} alt={''} />
        <div className="ml-3">
          <Typography as="title" element="h1" className="text-black-90">
            {vendorName}
          </Typography>
          <Rating star={star} size={16} withLabel readOnly count={count} />
        </div>
      </div>
    </div>
  );
}
