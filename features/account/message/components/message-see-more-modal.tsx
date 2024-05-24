import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import Rating from '@/features/review/components/rating';
import Image from 'next/image';

type Props = {
  title: string;
  date: string;
  content: string;
  imgSrc: string;
  star: number;
  rate: string;
};

/**
 * メッセージ詳細モーダルコンポーネント
 * @returns JSX.Element
 */
export default function MessageSeeMoreModal({ title, date, content, imgSrc, star, rate }: Props) {
  return (
    <Dialog>
      <DialogDescription>
        <DialogTrigger asChild>
          <Button className="border border-bibinBlue-100 bg-white-base">
            <Typography as="boldSmall" element="p" className="text-bibinBlue-100">
              もっと見る
            </Typography>
          </Button>
        </DialogTrigger>
        <DialogContent className="flex w-[592px] flex-col items-center justify-center">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <Typography as="caption" element="p" className="mb-[4px] text-[12px] text-charcoalGray">
            {date}
          </Typography>
          <div className="flex items-center rounded-[6px] border-[1px] p-[16px]">
            <Image alt="" src={imgSrc} width={40} height={40} className="relative rounded-[4px]" />
            <Typography
              as="boldSmall"
              element="p"
              className="ml-[16px] mr-[8px] text-[12px] text-black-90"
            >
              {title}
            </Typography>
            <Rating star={star} size={16} readOnly />
            <Typography as="small" element="p" className="ml-[5px] text-[12px] text-black-90">
              {rate}
            </Typography>
          </div>
          <Typography as="small" element="p" className="ml-[5px] text-[12px] text-black-90">
            {content}
          </Typography>
          <DialogClose asChild>
            <Button type="submit" size="lg" variant="lg" className="mt-[24px] w-[392px]">
              確認する
            </Button>
          </DialogClose>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
}
