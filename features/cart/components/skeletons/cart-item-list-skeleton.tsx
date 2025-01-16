import { Skeleton } from '@/components/ui/skeleton';
import { CartItemSkeleton } from './cart-item-skeleton';

export const CartItemListSkeleton = () => (
  <div className="bg-white rounded-md p-4 shadow-sm">
    {/* ショップ名と送料無料バッジ */}
    <div className="mb-4 flex items-center gap-2">
      <div className="h-6 w-6 shrink-0 rounded-full bg-gray-200" />
      <Skeleton className="h-5 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      <div className="flex items-center gap-1">
        <div className="h-4 w-4 rounded-full bg-gray-200" />
        <Skeleton className="h-4 w-20 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>
    </div>

    {/* アイテムリスト */}
    <div className="flex flex-col">
      {[...Array(2)].map((_, index) => (
        <CartItemSkeleton key={index} isLastItem={index === 1} />
      ))}
    </div>
  </div>
);
