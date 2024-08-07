import { Typography } from '@/components/ui/typography';
import Image from 'next/image';

type ItemProps = {
  imageSrc: string;
  title: string;
  price: string;
  optionsText?: string;
};

/**
 * 注文内容カードコンポーネント
 * @returns JSX.Element
 */
export default function OrderDetailListItem({ imageSrc, title, price, optionsText }: ItemProps) {
  return (
    <div className="mt-[16px] flex items-center">
      <div className="relative h-[100px] w-[100px]">
        <Image src={imageSrc} fill alt={''} />
      </div>
      <div className="ml-[16px]">
        <Typography as="boldSmall" element="p" className="text-[14px] text-black-90">
          {title}
        </Typography>
        {!!optionsText && (
          <Typography as="small" element="p" className="mt-[4px] text-[12px] text-black-70">
            {optionsText}
          </Typography>
        )}
        <Typography as="boldSmall" element="p" className="mt-[4px] text-[14px] text-bibinBlue-100">
          {price}
        </Typography>
      </div>
    </div>
  );
}
