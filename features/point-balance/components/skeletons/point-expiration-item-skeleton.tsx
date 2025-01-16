import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  isLastItem?: boolean;
};

export const PointExpirationItemSkeleton = ({ isLastItem }: Props) => (
  <div className={`py-4 ${!isLastItem && 'border-b border-gray-200'}`}>
    {/* 有効期限日 */}
    <div className="mb-2">
      <Skeleton className="h-5 w-32 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    </div>

    {/* ポイント数 */}
    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-28 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      <Skeleton className="h-6 w-16 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    </div>
  </div>
);
