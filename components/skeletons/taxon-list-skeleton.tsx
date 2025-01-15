import { Skeleton } from '@/components/ui/skeleton';

export const TaxonListSkeleton = () => (
  <div className="mt-6 flex w-full justify-center gap-4 px-4">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="flex flex-col items-center gap-2">
        <Skeleton className="h-16 w-16 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <Skeleton className="h-4 w-20 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>
    ))}
  </div>
);
