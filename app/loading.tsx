import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="h-full w-full">
      <div className="mx-auto flex w-full flex-col items-center pt-[73px] md:pt-[126px]">
        {/* モバイルメニュー用スケルトン */}
        <div className="w-full md:hidden">
          <Skeleton className="h-10 w-full" />
        </div>

        {/* カルーセルバナー用スケルトン */}
        <div className="w-full">
          <Skeleton className="h-[200px] w-full md:h-[400px]" />
        </div>

        {/* タクソンリスト用スケルトン */}
        <div className="mt-6 flex w-full justify-center gap-4 px-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>

        {/* SNSバナー用スケルトン */}
        <div className="mt-6 w-full px-4">
          <Skeleton className="h-[130px] w-full" />
        </div>

        {/* 商品一覧セクション用スケルトン */}
        {[...Array(3)].map((_, sectionIndex) => (
          <div key={sectionIndex} className="mt-6 w-full px-4">
            <Skeleton className="mb-4 h-8 w-40" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* ランキングセクション用スケルトン */}
        <div className="mt-6 w-full bg-paleFrostBlue px-4 py-6">
          <div className="flex flex-col items-center">
            <Skeleton className="mb-4 h-8 w-40" />
            <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
