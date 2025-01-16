import { Skeleton } from '@/components/ui/skeleton';

export const FilterFormSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-4 px-4 md:w-[225px] md:px-0">
      {/* カテゴリータイトル */}
      <Skeleton className="h-6 w-32" />

      {/* カテゴリーリスト */}
      <div className="space-y-3">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" /> {/* チェックボックス */}
            <Skeleton className="h-4 w-24" /> {/* カテゴリー名 */}
          </div>
        ))}
      </div>
    </div>
  );
};
