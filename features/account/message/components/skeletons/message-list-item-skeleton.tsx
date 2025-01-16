import { Skeleton } from '@/components/ui/skeleton';

export const MessageListItemSkeleton = () => (
  <div className="flex flex-col items-center justify-center md:items-stretch">
    <div className="flex w-full items-center">
      {/* アバター/商品画像 */}
      <Skeleton className="h-[40px] w-[40px] flex-shrink-0 animate-[pulse_1s_ease-in-out_infinite] rounded-[4px] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

      {/* メッセージ内容 */}
      <div className="mx-[12px] flex-1">
        <div className="flex items-center gap-1">
          <Skeleton className="h-5 w-48 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          <Skeleton className="to -gray-200 h-1.5 w-1.5 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200  via-gray-300" />
        </div>
        <Skeleton className="mt-1 h-4 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <Skeleton className="mt-2 h-4 w-full animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <Skeleton className="mt-1 h-4 w-[90%] animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>

      {/* 詳細ボタン */}
      <div className="flex h-8 items-center md:hidden">
        <Skeleton className="h-7 w-20 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>
    </div>
    {/* PC用詳細ボタン */}
    <div className="ml-auto hidden md:block">
      <Skeleton className="h-7 w-20 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    </div>
  </div>
);
