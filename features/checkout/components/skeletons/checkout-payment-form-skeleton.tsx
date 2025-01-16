import { Skeleton } from '@/components/ui/skeleton';

export const CheckoutPaymentFormSkeleton = () => (
  <div className="flex flex-col gap-4">
    {/* PayPay */}
    <div className="flex items-center gap-3">
      <div className="h-5 w-5 rounded-full border border-gray-300" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 animate-[pulse_1s_ease-in-out_infinite] rounded-sm bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <Skeleton className="h-4 w-16 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>
    </div>

    {/* コンビニ決済 */}
    <div className="flex items-center gap-3">
      <div className="h-5 w-5 rounded-full border border-gray-300" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 animate-[pulse_1s_ease-in-out_infinite] rounded-sm bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <Skeleton className="h-4 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>
    </div>

    {/* コンビニロゴ */}
    <div className="ml-8 flex flex-wrap gap-2">
      {[...Array(4)].map((_, index) => (
        <Skeleton
          key={index}
          className="h-8 w-12 animate-[pulse_1s_ease-in-out_infinite] rounded-sm bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
        />
      ))}
    </div>
  </div>
);
