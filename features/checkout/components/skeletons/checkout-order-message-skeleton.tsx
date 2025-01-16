import { Skeleton } from '@/components/ui/skeleton';

export const CheckoutOrderMessageSkeleton = () => {
  return (
    <div className="flex w-full flex-col items-center">
      {/* アイコン */}
      <Skeleton className="h-16 w-16 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

      {/* メッセージ */}
      <div className="mt-6 flex flex-col items-center gap-4">
        <Skeleton className="h-8 w-64 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        {/* タイトル */}
        <Skeleton className="h-6 w-48 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        {/* 注文番号 */}
        <div className="mt-2 space-y-2">
          <Skeleton className="h-4 w-72 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          {/* メッセージ行1 */}
          <Skeleton className="h-4 w-64 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          {/* メッセージ行2 */}
        </div>
      </div>
    </div>
  );
};
