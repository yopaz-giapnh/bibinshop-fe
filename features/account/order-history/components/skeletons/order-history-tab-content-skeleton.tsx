import { OrderHistoryItemSkeleton } from './order-history-item-skeleton';

export const OrderHistoryTabContentSkeleton = () => (
  <div>
    <div className="overflow-y-auto overflow-x-hidden md:h-[calc(100vh-252px)]">
      <div className="w-full px-[8px] md:px-0">
        {[...Array(3)].map((_, index) => (
          <OrderHistoryItemSkeleton key={index} />
        ))}
      </div>
    </div>
  </div>
);
