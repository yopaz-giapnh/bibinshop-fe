import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import Rating from '@/features/review/components/rating';
import Image from 'next/image';

type Props = {
  item: {
    title: string;
    color: string;
    rating: number;
    image: string;
    alt: string;
  };
};

/**
 * レビューを書く画面のアイテムカードコンポーネント
 * @returns JSX.Element
 */
export default function WriteReviewItem({ item }: Props) {
  return (
    <div className="mt-[24px] w-full rounded-[6px] bg-white-base p-[16px] shadow-sm">
      <div className="flex">
        <Image src={item.image} width={100} height={100} alt={item.alt} />
        <div className="ml-[8px]">
          <Typography as="bold" element="p" className="text-[14px] text-black-90">
            {item.title}
          </Typography>
          {/* TODO: 色は api が実装されてから */}
          {/* <Typography as="small" element="p" className="mt-[4px] text-[12px] text-black-70">
            {`色: ${item.color}`}
          </Typography> */}
        </div>
      </div>
      <div className="mt-[16px] flex items-center">
        <Typography as="boldSmall" element="p" className="pr-[16px] text-[20px] text-black-90">
          評価
        </Typography>
        <Rating star={item.rating} size={27} />
      </div>
      <Typography as="small" element="p" className="mt-[14px] text-[14px] text-black-90">
        レビュー
      </Typography>
      <Textarea className="mt-[8px] h-[160px]" placeholder="レビュー" />
    </div>
  );
}
