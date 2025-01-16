import { Skeleton } from '@/components/ui/skeleton';

export const ProfileDetailSkeleton = () => (
  <div className="h-full">
    {/* プロフィールヘッダー */}
    <div className="flex h-[90px] pl-[16px] md:ml-[24px] md:mr-0 md:h-fit md:justify-normal md:pl-0">
      {/* アバター */}
      <div className="relative h-[84px] w-[88px] md:h-[154px] md:w-[160px]">
        <Skeleton className="h-full w-full animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>

      {/* プロフィール情報 */}
      <div className="ml-[16px] flex flex-col items-start justify-between">
        <div className="items-center md:flex">
          <Skeleton className="h-7 w-40 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 md:mr-4" />
          <Skeleton className="mt-2 h-10 w-28 animate-[pulse_1s_ease-in-out_infinite] rounded-lg bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 md:mt-0" />
        </div>

        {/* PC用統計情報 */}
        <div className="mt-[8px] hidden space-y-2 md:block">
          <div className="flex gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-6 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-6 w-20 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
              />
            ))}
          </div>
          <div className="flex gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-8 w-8 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
              />
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* モバイル用統計情報 */}
    <div className="mt-[16px] flex flex-col items-center space-y-4 md:hidden">
      <div className="flex gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-6 w-20 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
          />
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {[...Array(6)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-6 w-16 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
          />
        ))}
      </div>
      <div className="flex gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-8 w-8 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
          />
        ))}
      </div>
    </div>

    {/* タブコンテンツ */}
    <div className="mt-6">
      {/* タブヘッダー */}
      <div className="flex flex-col">
        {/* タブナビゲーション */}
        <div className="flex items-center gap-8 border-b border-gray-200 px-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 pb-4">
              <Skeleton className="h-5 w-5 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
              <Skeleton className="h-5 w-16 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            </div>
            <div className="h-0.5 w-full bg-bibinBlue-100" />
          </div>
          <div className="flex items-center gap-2 pb-4">
            <Skeleton className="h-5 w-5 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            <Skeleton className="h-5 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          </div>
        </div>

        {/* レビューフィルター */}
        <div className="mt-4 flex gap-2 overflow-x-auto px-4">
          <Skeleton className="h-9 w-32 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          <Skeleton className="h-9 w-20 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          <Skeleton className="h-9 w-20 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          <Skeleton className="h-9 w-20 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          <Skeleton className="h-9 w-20 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
      </div>

      {/* レビューコンテンツ */}
      <div className="mt-4 space-y-4 px-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-start gap-4">
              {/* 商品画像 */}
              <Skeleton className="h-24 w-24 animate-[pulse_1s_ease-in-out_infinite] rounded-lg bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
              <div className="flex-1 space-y-2">
                {/* 商品名 */}
                <Skeleton className="h-5 w-3/4 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                {/* 評価と日付 */}
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton
                        key={i}
                        className="h-4 w-4 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
                      />
                    ))}
                  </div>
                  <Skeleton className="h-4 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                </div>
                {/* レビューテキスト */}
                <Skeleton className="h-4 w-full animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                <Skeleton className="h-4 w-[90%] animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                {/* 商品価格 */}
                <Skeleton className="mt-2 h-4 w-20 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
