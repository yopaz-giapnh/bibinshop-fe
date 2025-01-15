import { Skeleton } from '@/components/ui/skeleton';

export const CheckoutAddressFormSkeleton = () => (
  <div className="flex flex-col">
    {/* 住所情報 */}
    <div className="bg-white rounded-md border border-gray-100 p-4">
      {/* 名前 */}
      <Skeleton className="mb-2 h-5 w-32 bg-gray-200" />

      {/* 電話番号 */}
      <Skeleton className="mb-2 h-5 w-40 bg-gray-200" />

      {/* 郵便番号 */}
      <Skeleton className="mb-2 h-5 w-24 bg-gray-200" />

      {/* 住所 */}
      <div className="flex flex-col gap-1">
        <Skeleton className="h-5 w-48 bg-gray-200" />
        <Skeleton className="h-5 w-64 bg-gray-200" />
        <Skeleton className="h-5 w-48 bg-gray-200" />
      </div>
    </div>
  </div>
);
