import { Skeleton } from '@/components/ui/skeleton';
import { CornerDownRight } from 'lucide-react';

export const ReviewCommentListItemSkeleton = () => (
  <div className="flex items-start space-x-3 pl-4">
    <CornerDownRight className="h-[16px] w-[16px] text-black-90" />
    {/* アバター */}
    <Skeleton className="h-[32px] w-[32px] animate-[pulse_1s_ease-in-out_infinite] rounded-full border border-gray-200 bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    <div className="flex-1">
      {/* ユーザー情報 */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-20 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <Skeleton className="h-4 w-4 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <Skeleton className="h-4 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>
      {/* コメント本文 */}
      <div className="mt-1 max-w-[720px]">
        <Skeleton className="h-4 w-full animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <Skeleton className="mt-1 h-4 w-3/4 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>
      {/* フィードバックボタン */}
      <Skeleton className="mt-2 h-8 w-24 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    </div>
  </div>
);

export const ReviewCommentListSkeleton = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <ReviewCommentListItemSkeleton key={i} />
    ))}
  </div>
);
