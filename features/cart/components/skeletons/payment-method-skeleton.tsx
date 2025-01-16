import { Skeleton } from '@/components/ui/skeleton';

export const PaymentMethodSkeleton = () => (
  <div className="bg-white rounded-md p-4 shadow-sm">
    {/* タイトル */}
    <div className="mb-4">
      <Skeleton className="h-6 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    </div>

    {/* カード会社のロゴ */}
    <div className="grid grid-cols-5 gap-2">
      {[...Array(10)].map((_, index) => (
        <Skeleton
          key={index}
          className="h-8 w-full animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
        />
      ))}
    </div>

    {/* その他の支払い方法 */}
    <div className="mt-4 grid grid-cols-3 gap-2">
      {[...Array(3)].map((_, index) => (
        <Skeleton
          key={index}
          className="h-8 w-full animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
        />
      ))}
    </div>
  </div>
);
