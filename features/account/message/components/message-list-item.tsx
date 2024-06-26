import { Typography } from '@/components/ui/typography';
import { getVendorImageUrl } from '@/features/vendor/utils';
import { cn } from '@/lib/utils';
import { formatDateString } from '@/utils/date';
import Image from 'next/image';
import { Message } from '../types';
import MessageSeeMoreModal from './message-see-more-modal';

type Props = {
  message: Message;
};

/**
 * メッセージ一覧のリストアイテムコンポーネント
 * @returns JSX.Element
 */
export default function MessageListItem({ message }: Props) {
  const vendorImageUrl = getVendorImageUrl(message.vendorImage);
  const date = formatDateString(message.attributes.created_at, 'yyyy年MM月dd日');

  return (
    <div className="flex flex-col items-center justify-center md:items-stretch">
      <div className="flex items-center justify-between">
        <Image
          alt=""
          src={vendorImageUrl}
          width={40}
          height={40}
          className="relative rounded-[4px]"
        />
        <div className="mx-[12px] w-full">
          <div className="flex items-center">
            <Typography as="boldSmall" element="p" className="text-[14px] text-black-90">
              {message.attributes.title}
            </Typography>
            <div
              className={cn(
                'ml-[4px] h-[6px] w-[6px] rounded-[100px]',
                !message.attributes.read ? 'bg-red-600' : ''
              )}
            />
          </div>
          <Typography
            as="caption"
            element="p"
            className="mb-[4px] mt-[4px] text-[12px] text-charcoalGray"
          >
            {date}
          </Typography>
          <Typography
            as="caption"
            element="p"
            className="line-clamp-3 overflow-hidden text-ellipsis break-words text-[14px] text-charcoalGray"
          >
            {message.attributes.content}
          </Typography>
        </div>
        <div className="hidden md:block">
          <MessageSeeMoreModal message={message} />
        </div>
      </div>
      <div className="pt-[12px] md:hidden">
        <MessageSeeMoreModal message={message} />
      </div>
    </div>
  );
}
