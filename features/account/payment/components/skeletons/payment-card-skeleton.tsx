import { Skeleton } from '@/components/ui/skeleton';

export const PaymentCardSkeleton = () => (
  <div className="relative flex w-full items-end rounded-[6px] border border-solid border-black-10 bg-white-base p-4 shadow-base">
    <div className="flex flex-col gap-4">
      {/* カードブランドとタイプ */}
      <div className="flex items-center">
        <Skeleton className="h-8 w-12 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <Skeleton className="ml-[8px] h-7 w-32 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>

      {/* カード番号 */}
      <Skeleton className="h-5 w-48 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    </div>

    {/* 削除ボタン */}
    <div className="absolute right-4 top-4 md:bottom-4 md:top-auto">
      <Skeleton className="h-8 w-8 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    </div>
  </div>
);
