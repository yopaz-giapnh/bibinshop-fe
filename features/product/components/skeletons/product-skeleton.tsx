import { Skeleton } from '@/components/ui/skeleton';

export const ProductSkeleton = () => (
  <div className="w-full px-4">
    <div className="flex justify-center">
      <Skeleton className="mb-4 h-8 w-40 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    </div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Skeleton className="aspect-square w-full animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          <Skeleton className="h-4 w-3/4 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          <Skeleton className="h-4 w-1/2 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
      ))}
    </div>
  </div>
);
