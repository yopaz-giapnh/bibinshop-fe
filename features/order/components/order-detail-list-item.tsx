import { Typography } from '@/components/ui/typography';
import Image from 'next/image';

type ItemProps = {
  imageSrc: string;
  title: string;
  color: string;
  price: string;
};

/**
 * 注文内容カードコンポーネント
 * @returns JSX.Element
 */
export default function OrderDetailListItem({ imageSrc, title, color, price }: ItemProps) {
  return (
    <div className="mt-[16px] flex items-center">
      <Image src={imageSrc} width={100} height={100} alt="" />
      <div className="ml-[16px]">
        <Typography as="boldSmall" element="p" className="text-[14px] text-black-90">
          {title}
        </Typography>
        <Typography as="small" element="p" className="mt-[4px] text-[12px] text-black-70">
          色: {color}
        </Typography>
        <Typography as="boldSmall" element="p" className="mt-[4px] text-[14px] text-bibinBlue-100">
          {price}
        </Typography>
      </div>
    </div>
  );
}
