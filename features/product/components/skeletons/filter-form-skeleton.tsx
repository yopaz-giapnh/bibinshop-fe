import { Skeleton } from '@/components/ui/skeleton';

export const FilterFormSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-4 px-4 md:w-[225px] md:px-0">
      {/* カテゴリータイトル */}
      <Skeleton className="h-6 w-32 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

      {/* カテゴリーリスト */}
      <div className="space-y-3">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            {/* チェックボックス */}
            <Skeleton className="h-4 w-4 animate-[pulse_1s_ease-in-out_infinite] rounded bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            {/* カテゴリー名 */}
            <Skeleton className="h-4 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
};
