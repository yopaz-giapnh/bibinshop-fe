import { Skeleton } from '@/components/ui/skeleton';

export const SupplementarySkeleton = () => {
  return (
    <div className="mt-4 space-y-4 rounded-lg border p-4">
      {/* タイトル */}
      <Skeleton className="h-6 w-40 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

      {/* 補足情報リスト */}
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-start gap-2">
            {/* アイコン */}
            <Skeleton className="h-5 w-5 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-full animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
              <Skeleton className="h-4 w-3/4 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
