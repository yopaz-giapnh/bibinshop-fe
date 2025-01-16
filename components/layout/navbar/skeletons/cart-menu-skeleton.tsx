import { Skeleton } from '@/components/ui/skeleton';

export const CartMenuSkeleton = () => (
  <div className="md:ml-[20px]">
    <div className="flex items-center">
      <div className="relative flex">
        {/* カートアイコン */}
        <Skeleton className="h-6 w-6 animate-[pulse_1s_ease-in-out_infinite] rounded-sm bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>
      {/* カートテキスト（PC表示のみ） */}
      <Skeleton className="ml-1 hidden h-4 w-12 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 md:block" />
    </div>
  </div>
);
