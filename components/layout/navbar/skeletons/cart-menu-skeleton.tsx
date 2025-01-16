import { Skeleton } from '@/components/ui/skeleton';

export const CartMenuSkeleton = () => (
  <div className="md:ml-[20px]">
    <div className="flex items-center">
      <div className="relative flex">
        {/* カートアイコン */}
        <Skeleton className="h-6 w-6 rounded-sm bg-gray-200" />
      </div>
      {/* カートテキスト（PC表示のみ） */}
      <Skeleton className="ml-1 hidden h-4 w-12 bg-gray-200 md:block" />
    </div>
  </div>
);
