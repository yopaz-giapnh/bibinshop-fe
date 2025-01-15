import { Skeleton } from '@/components/ui/skeleton';
import { ProductSkeleton } from '@/features/product/components/skeletons/product-skeleton';

export const NotFoundSkeleton = () => (
  <>
    <div className="mx-[49px] mt-32 flex flex-col items-center justify-center md:mt-60">
      {/* 404 not found テキスト */}
      <Skeleton className="mb-[24px] h-8 w-32 bg-gray-200" />

      {/* BibiSuprisedFace アイコン */}
      <Skeleton className="h-32 w-32 rounded-full bg-gray-200" />

      {/* エラーメッセージ */}
      <Skeleton className="mt-[24px] h-6 w-80 bg-gray-200" />

      {/* ホームに戻るボタン */}
      <Skeleton className="mb-[80px] mt-[24px] h-12 w-[220px] rounded-full bg-gray-200 md:w-[392px]" />
    </div>

    {/* 新着商品セクション */}
    <div className="ml-2 mr-2 flex md:ml-6 md:mr-6">
      <ProductSkeleton />
    </div>
  </>
);
