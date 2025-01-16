import { Skeleton } from '@/components/ui/skeleton';

export const CheckoutUsePointFormSkeleton = () => (
  <div className="flex flex-col gap-4">
    {/* セクションタイトル */}
    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-32 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      <div className="flex items-center gap-1">
        <Skeleton className="h-5 w-16 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <Skeleton className="h-5 w-8 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>
    </div>

    {/* ポイント使用フォーム */}
    <div className="flex flex-col gap-2">
      {/* 利用可能ポイント */}
      <div className="flex items-center gap-2">
        <Skeleton className="to -gray-200 h-4 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200  via-gray-300" />
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-16 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          <Skeleton className="h-4 w-4 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
      </div>

      {/* ポイント入力フィールド */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <div className="flex h-10 items-center rounded-md border border-gray-200 px-3">
            <Skeleton className="h-5 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          </div>
        </div>
        <Skeleton className="to -gray-200 h-10 w-24 animate-[pulse_1s_ease-in-out_infinite] rounded-md bg-gray-200 bg-gradient-to-r from-gray-200  via-gray-300" />
      </div>

      {/* 注意書き */}
      <Skeleton className="h-4 w-full animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    </div>
  </div>
);
