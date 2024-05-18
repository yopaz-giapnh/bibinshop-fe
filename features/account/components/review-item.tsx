import Rating from '@/components/layout/rating';
import { Typography } from '@/components/ui/typography';
import Image from 'next/image';

type ReviewProps = {
  date: string;
  star: number;
  color: string;
  text: string;
  price: string;
  productImageSrc: string;
  productDescription: string;
};

export default async function ReviewItem({
  date,
  star,
  color,
  text,
  price,
  productImageSrc,
  productDescription
}: ReviewProps) {
  return (
    <div>
      <div className="flex items-baseline">
        <Rating star={star} readOnly />
        <Typography as="xSmall" element="p" className="text-[14px] text-gray-400">
          ・{date}
        </Typography>
      </div>
      <Typography as="bold" element="p" className="mt-[8px] text-[14px] text-black-90">
        色：{color}
      </Typography>
      <Typography as="xSmall" element="p" className="mt-[16px] text-[16px] text-black-90">
        {text}
      </Typography>
      <div className="mt-[32px] flex items-center rounded-[4px] bg-paleFrostBlue p-[16px]">
        <Image
          src={productImageSrc}
          width={100}
          height={100}
          className="rounded-[100px]"
          alt={''}
        />
        <div className="pl-[16px]">
          <Typography as="bold" element="p" className="text-[16px] text-black-90">
            {productDescription}
          </Typography>
          <Typography as="bold" element="p" className="mt-[10px] text-[14px] text-bibinBlue-100">
            {price}円
          </Typography>
        </div>
      </div>
    </div>
  );
}
