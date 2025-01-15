import { Skeleton } from '@/components/ui/skeleton';

export const CheckoutUsePointFormSkeleton = () => (
  <div className="flex flex-col gap-4">
    {/* セクションタイトル */}
    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-32 bg-gray-200" />
      <div className="flex items-center gap-1">
        <Skeleton className="h-5 w-16 bg-gray-200" />
        <Skeleton className="h-5 w-8 bg-gray-200" />
      </div>
    </div>

    {/* ポイント使用フォーム */}
    <div className="flex flex-col gap-2">
      {/* 利用可能ポイント */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-24 bg-gray-200" />
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-16 bg-gray-200" />
          <Skeleton className="h-4 w-4 bg-gray-200" />
        </div>
      </div>

      {/* ポイント入力フィールド */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <div className="flex h-10 items-center rounded-md border border-gray-200 px-3">
            <Skeleton className="h-5 w-24 bg-gray-200" />
          </div>
        </div>
        <Skeleton className="h-10 w-24 rounded-md bg-gray-200" />
      </div>

      {/* 注意書き */}
      <Skeleton className="h-4 w-full bg-gray-200" />
    </div>
  </div>
);
