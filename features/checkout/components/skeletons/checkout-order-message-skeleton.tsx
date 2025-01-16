import { Skeleton } from '@/components/ui/skeleton';

export const CheckoutOrderMessageSkeleton = () => {
  return (
    <div className="flex w-full flex-col items-center">
      {/* アイコン */}
      <Skeleton className="h-16 w-16 rounded-full" />

      {/* メッセージ */}
      <div className="mt-6 flex flex-col items-center gap-4">
        <Skeleton className="h-8 w-64" /> {/* タイトル */}
        <Skeleton className="h-6 w-48" /> {/* 注文番号 */}
        <div className="mt-2 space-y-2">
          <Skeleton className="h-4 w-72" /> {/* メッセージ行1 */}
          <Skeleton className="h-4 w-64" /> {/* メッセージ行2 */}
        </div>
      </div>
    </div>
  );
};
