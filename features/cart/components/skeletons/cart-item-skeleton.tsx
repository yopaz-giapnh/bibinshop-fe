import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  isLastItem?: boolean;
};

export const CartItemSkeleton = ({ isLastItem }: Props) => (
  <div className={`flex gap-4 py-4 ${!isLastItem && 'border-b border-gray-200'}`}>
    {/* 商品画像 */}
    <Skeleton className="h-24 w-24 shrink-0 animate-[pulse_1s_ease-in-out_infinite] rounded-md bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

    <div className="flex flex-1 flex-col gap-2">
      {/* ショップ名 */}
      <Skeleton className="h-4 w-32 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

      {/* 商品名 */}
      <Skeleton className="h-4 w-full animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

      {/* 価格と数量 */}
      <div className="mt-auto flex items-center justify-between">
        <Skeleton className="h-6 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          <Skeleton className="h-8 w-12 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          <Skeleton className="h-8 w-8 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
      </div>
    </div>
  </div>
);
