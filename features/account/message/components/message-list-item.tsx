// components/MessageListItem.js
import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import MessageSeeMoreModal from './message-see-more-modal';

type Props = {
  title: string;
  date: string;
  content: string;
  imgSrc: string;
  star: number;
  rate: string;
};

/**
 * メッセージ一覧のリストアイテムコンポーネント
 * @returns JSX.Element
 */
export default function MessageListItem({ title, date, content, imgSrc, star, rate }: Props) {
  return (
    <div className="flex items-center justify-between">
      <Image alt="" src={imgSrc} width={40} height={40} className="relative rounded-[4px]" />
      <div className="mx-[12px] w-full">
        <div className="flex items-center">
          <Typography as="boldSmall" element="p" className="text-[14px] text-black-90">
            {title}
          </Typography>
          {/* TODO: no readマークはisReadみたいなパラメーターで管理する？ */}
          <div className=" ml-[4px] h-[6px] w-[6px] rounded-[100px] bg-red-600" />
          {/* TODO: ↑ */}
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
          {content}
        </Typography>
      </div>
      <MessageSeeMoreModal
        title={title}
        date={date}
        content={content}
        imgSrc={imgSrc}
        star={star}
        rate={rate}
      />
    </div>
  );
}
