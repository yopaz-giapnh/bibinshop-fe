import { PointHistoryItemSkeleton } from './point-history-item-skeleton';

export const PointBalanceTabContentSkeleton = () => (
  <div className="m-[16px] w-full rounded-md bg-white-base px-[16px] shadow-sm md:px-[24px]">
    {[...Array(5)].map((_, index) => (
      <PointHistoryItemSkeleton key={index} isLastItem={index === 4} />
    ))}
  </div>
);
