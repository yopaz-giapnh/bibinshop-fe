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
import { getVendorImageUrl } from '@/features/vendor/utils';
import { formatDateString } from '@/utils/date';
import Image from 'next/image';
import { getAccountMessageDetail } from '../actions';
import { Message } from '../types';

type Props = {
  message: Message;
};

/**
 * メッセージ詳細モーダルコンポーネント
 * @returns JSX.Element
 */
export default function MessageSeeMoreModal({ message }: Props) {
  const action = getAccountMessageDetail.bind(null, { id: message.id });

  const vendorImageUrl = getVendorImageUrl(message.vendorImage);
  const date = formatDateString(message.attributes.created_at, 'yyyy年MM月dd日');

  return (
    <Dialog>
      <DialogDescription>
        <DialogTrigger asChild>
          <form action={action}>
            <Button className="border border-bibinBlue-100 bg-white-base">
              <Typography as="boldSmall" element="p" className="text-bibinBlue-100">
                もっと見る
              </Typography>
            </Button>
          </form>
        </DialogTrigger>
        <DialogContent className="flex w-[592px] flex-col items-center justify-center">
          <DialogHeader>
            <DialogTitle>{message.attributes.title}</DialogTitle>
          </DialogHeader>
          <Typography as="caption" element="p" className="mb-[4px] text-[12px] text-charcoalGray">
            {date}
          </Typography>
          <div className="flex items-center rounded-[6px] border-[1px] p-[16px]">
            <Image
              alt=""
              src={vendorImageUrl}
              width={40}
              height={40}
              className="relative rounded-[4px]"
            />
            <Typography
              as="boldSmall"
              element="p"
              className="ml-[16px] mr-[8px] text-[12px] text-black-90"
            >
              {message.attributes.title}
            </Typography>
            <Rating star={4.1} size={16} readOnly />
            <Typography as="small" element="p" className="ml-[5px] text-[12px] text-black-90">
              4.1
            </Typography>
          </div>
          <Typography as="small" element="p" className="ml-[5px] text-[12px] text-black-90">
            {message.attributes.content}
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
