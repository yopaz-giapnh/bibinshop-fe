import { Skeleton } from '@/components/ui/skeleton';

export const SecurityDetailSkeleton = () => (
  <div className="w-full rounded-[6px] bg-white-base px-[18px] py-3 shadow-base md:px-[48px] md:py-6">
    {/* メールセクション */}
    <div className="mb-4">
      <Skeleton className="mb-2 h-6 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      <Skeleton className="h-5 w-64 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    </div>

    <div className="my-[16px] border-t-[1px]" />

    {/* パスワードセクション */}
    <div className="flex justify-between">
      <div>
        <Skeleton className="mb-2 h-6 w-40 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <Skeleton className="h-5 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>
      <div>
        <Skeleton className="h-10 w-24 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>
    </div>
  </div>
);
