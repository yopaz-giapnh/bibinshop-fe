import { Skeleton } from '@/components/ui/skeleton';

export const SnsUserCardSkeleton = () => (
  <div className="bg-white w-full rounded-lg p-6 shadow-md">
    <div className="flex items-start gap-6">
      {/* ユーザーアバター */}
      <Skeleton className="h-40 w-40 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

      <div className="flex-1">
        {/* ユーザー名とフォロワー数 */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            <Skeleton className="h-4 w-32 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          </div>
          <Skeleton className="h-10 w-28 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>

        {/* ユーザー情報 */}
        <div className="mt-6 space-y-2">
          <Skeleton className="h-4 w-full max-w-[600px] animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          <Skeleton className="h-4 w-[80%] max-w-[480px] animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
      </div>
    </div>

    {/* おすすめ商品 */}
    <div className="mt-6">
      <Skeleton className="mb-4 h-6 w-48 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="aspect-square w-full animate-[pulse_1s_ease-in-out_infinite] rounded-lg bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            <Skeleton className="h-4 w-full animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            <Skeleton className="h-4 w-2/3 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          </div>
        ))}
      </div>
    </div>
  </div>
);
