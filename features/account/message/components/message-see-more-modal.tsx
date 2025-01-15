'use server';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import Rating from '@/features/review/components/rating';
import { getVendor } from '@/features/vendor/actions';
import { getVendorImageUrl } from '@/features/vendor/utils';
import { formatDateString } from '@/utils/date';
import Image from 'next/image';
import Link from 'next/link';
import { getAccountMessageDetail } from '../actions';
import { Message } from '../types';

type Props = {
  message: Message;
};

/**
 * メッセージ詳細モーダルコンポーネント
 * @returns JSX.Element
 */
export default async function MessageSeeMoreModal({ message }: Props) {
  const action = () => {
    'use server';
    getAccountMessageDetail({ id: message.id });
  };

  const vendorId = message.attributes.notificationable?.vendor_id;

  const vendor = vendorId ? await getVendor(vendorId) : undefined;
  const vendorImageUrl = getVendorImageUrl(vendor?.vendorImage);
  const date = formatDateString(message.attributes.created_at, 'yyyy年MM月dd日');

  return (
    <Dialog>
      <DialogTrigger asChild type="button">
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
        {vendor && vendor.attributes.stars != null && (
          <Link
            href={`/vendors/${vendor.id}`}
            passHref
            className="flex items-center rounded-[6px] border-[1px] p-[16px]"
          >
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[4px] border border-gray-200">
              <Image
                alt=""
                src={vendorImageUrl}
                width={40}
                height={40}
                className="relative h-full w-full rounded-[4px] object-cover"
              />
            </div>
            <Typography
              as="boldSmall"
              element="p"
              className="ml-[16px] mr-[8px] text-[12px] text-black-90"
            >
              {message.attributes.title}
            </Typography>
            <Rating star={vendor.attributes.stars} size={16} readOnly />
            <Typography as="small" element="p" className="ml-[5px] text-[12px] text-black-90">
              {vendor.attributes.stars}
            </Typography>
          </Link>
        )}
        <Typography
          as="small"
          element="p"
          className="ml-[5px] max-h-[200px] overflow-y-auto text-[12px] text-black-90 md:max-h-[350px]"
        >
          {message.attributes.content}
        </Typography>
        <DialogClose asChild>
          <Button type="submit" size="lg" variant="lg" className="mt-[24px] w-11/12 md:w-[392px]">
            確認する
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
