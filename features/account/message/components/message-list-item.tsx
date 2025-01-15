import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { formatDateString } from '@/utils/date';
import Image from 'next/image';
import { Message } from '../types';
import { getMessageImageUrl } from '../utils';
import MessageSeeMoreModal from './message-see-more-modal';

type Props = {
  message: Message;
};

/**
 * メッセージ一覧のリストアイテムコンポーネント
 * @returns JSX.Element
 */
export default function MessageListItem({ message }: Props) {
  const messageImageUrl = getMessageImageUrl(message);
  const date = formatDateString(message.attributes.created_at, 'yyyy年MM月dd日');
  const isReviewComment = message.attributes.title.includes('レビューにコメント');

  return (
    <div className="flex flex-col items-center justify-center md:items-stretch">
      <div className="flex w-full items-center">
        <div
          className={cn(
            'flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center border border-gray-200',
            isReviewComment ? 'rounded-full' : 'rounded-[4px]'
          )}
        >
          <Image
            alt=""
            src={messageImageUrl}
            width={40}
            height={40}
            className={cn(
              'relative h-full w-full object-cover',
              isReviewComment ? 'rounded-full' : 'rounded-[4px]'
            )}
          />
        </div>
        <div className="mx-[12px]">
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
        <div className="md:hidden">
          <MessageSeeMoreModal message={message} />
        </div>
      </div>
      <div className="ml-auto hidden md:block">
        <MessageSeeMoreModal message={message} />
      </div>
    </div>
  );
}
