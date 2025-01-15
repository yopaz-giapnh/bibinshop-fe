import { Skeleton } from '@/components/ui/skeleton';

export const SecurityDetailSkeleton = () => (
  <div className="w-full rounded-[6px] bg-white-base px-[18px] py-3 shadow-base md:px-[48px] md:py-6">
    {/* メールセクション */}
    <div className="mb-4">
      <Skeleton className="mb-2 h-6 w-24 bg-gray-200" />
      <Skeleton className="h-5 w-64 bg-gray-200" />
    </div>

    <div className="my-[16px] border-t-[1px]" />

    {/* パスワードセクション */}
    <div className="flex justify-between">
      <div>
        <Skeleton className="mb-2 h-6 w-40 bg-gray-200" />
        <Skeleton className="h-5 w-24 bg-gray-200" />
      </div>
      <div>
        <Skeleton className="h-10 w-24 rounded-full bg-gray-200" />
      </div>
    </div>
  </div>
);
