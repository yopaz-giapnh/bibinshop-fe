import { MessageListItemSkeleton } from './message-list-item-skeleton';

export const MessageListSkeleton = () => (
  <div className="w-full overflow-y-auto rounded-[6px] bg-white-base p-[16px] shadow-base md:p-[24px]">
    {[...Array(5)].map((_, index) => (
      <div key={index}>
        {index > 0 && <div className="my-4 border-t-[1px]" />}
        <MessageListItemSkeleton />
      </div>
    ))}
  </div>
);
