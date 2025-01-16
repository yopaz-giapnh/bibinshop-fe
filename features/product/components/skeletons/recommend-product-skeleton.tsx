import { Skeleton } from '@/components/ui/skeleton';

export const RecommendProductSkeleton = () => {
  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-5">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          {/* 商品画像 */}
          <Skeleton className="aspect-square w-full rounded-lg" />

          {/* 商品情報 */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" /> {/* 商品名 */}
            <Skeleton className="h-4 w-2/3" /> {/* 価格 */}
          </div>
        </div>
      ))}
    </div>
  );
};
