import { Skeleton } from '@/components/ui/skeleton';

export const CheckoutCompleteSkeleton = () => (
  <div className="h-full w-full bg-paleFrostBlue">
    <div className="mx-auto flex w-full flex-col items-center px-2 md:px-[272px] md:pt-[24px]">
      {/* メッセージ部分 */}
      <div className="mb-8 flex w-full flex-col items-center gap-4">
        <Skeleton className="h-8 w-64 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <Skeleton className="h-6 w-48 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>

      {/* 注文詳細 */}
      <div className="w-full">
        {/* 注文概要 */}
        <div className="mb-4 rounded-md bg-white-base p-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-32 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            <Skeleton className="h-4 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
              <Skeleton className="h-4 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            </div>
          </div>
        </div>

        {/* 支払い方法 */}
        <div className="mb-4 rounded-md bg-white-base p-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-32 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 animate-[pulse_1s_ease-in-out_infinite] rounded-sm bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
              <Skeleton className="h-4 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            </div>
          </div>
        </div>

        {/* 配送先住所 */}
        <div className="mb-4 rounded-md bg-white-base p-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-32 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            <Skeleton className="h-4 w-40 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            <Skeleton className="h-4 w-32 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-48 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
              <Skeleton className="h-4 w-64 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
              <Skeleton className="h-4 w-48 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            </div>
          </div>
        </div>

        {/* 注文内容 */}
        <div className="mb-4 rounded-md bg-white-base p-4">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-32 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            {/* 商品アイテム */}
            {[...Array(2)].map((_, index) => (
              <div key={index} className="flex gap-4">
                <Skeleton className="h-24 w-24 animate-[pulse_1s_ease-in-out_infinite] rounded-md bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-4 w-48 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                  <Skeleton className="h-4 w-32 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                    <Skeleton className="h-4 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* お買い物を続けるボタン */}
      <Skeleton className="mt-[24px] h-[48px] w-[350px] rounded-md bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 md:h-[55px] md:w-[392px]" />
    </div>
  </div>
);
