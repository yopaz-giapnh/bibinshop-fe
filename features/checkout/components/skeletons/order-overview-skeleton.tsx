import { Skeleton } from '@/components/ui/skeleton';

export const OrderOverviewSkeleton = () => (
  <div className="flex flex-col gap-4">
    {/* 注文概要 */}
    <div className="rounded-md bg-white-base p-4 shadow-sm">
      {/* タイトル */}
      <div className="mb-4">
        <span className="text-[26px] font-bold">注文概要</span>
      </div>

      {/* 商品金額 */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-[14px] text-gray-700">商品金額</span>
          <span className="text-[14px] text-gray-700">(2)</span>
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-16 bg-gray-200" />
          <span className="text-[14px]">円</span>
        </div>
      </div>

      {/* 小計 */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[14px] text-gray-700">小計</span>
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-16 bg-gray-200" />
          <span className="text-[14px]">円</span>
        </div>
      </div>

      {/* 獲得予定ポイント */}
      <div className="flex items-center justify-center gap-1 text-[14px] text-gray-500">
        <span>獲得予定</span>
        <Skeleton className="h-4 w-16 bg-gray-200" />
        <span>ポイント</span>
        <div className="h-4 w-4 rounded-full bg-gray-200" />
      </div>

      {/* 次へ進むボタン */}
      <button className="mt-4 h-12 w-full rounded-full bg-gradient-to-r from-blue-400 to-green-400 text-[16px] font-bold">
        <span className="text-[16px] text-white-base">次へ進む</span>
      </button>
    </div>

    {/* 支払い方法 */}
    <div className="rounded-md bg-white-base p-4 shadow-sm">
      <div className="mb-4">
        <span className="text-[24px] font-bold">支払い方法</span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {[...Array(13)].map((_, index) => (
          <div key={index} className="h-8 w-full rounded-sm bg-gray-200" />
        ))}
      </div>
    </div>
  </div>
);
