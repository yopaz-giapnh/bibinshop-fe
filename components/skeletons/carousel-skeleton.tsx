import { Skeleton } from '@/components/ui/skeleton';

export const CarouselSkeleton = () => (
  <div className="w-full">
    <Skeleton className="h-[200px] w-full animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 md:h-[400px]" />
  </div>
);
