import { OrderHistoryTabs } from '@/features/account/order-history/components/order-history-tabs';
import { OrderHistorySkeleton } from '@/features/account/order-history/components/skeletons/order-history-skeleton';
import { Suspense } from 'react';

/**
 * 注文履歴ホーム画面
 * @returns JSX.Element
 */
export default function Page({
  searchParams
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const tabState = (searchParams.state as string) || 'all';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="mx-auto flex w-full flex-col items-center bg-paleFrostBlue p-[14px] md:p-[24px]">
      <Suspense fallback={<OrderHistorySkeleton />}>
        <OrderHistoryTabs currentPage={currentPage} tabState={tabState} />
      </Suspense>
    </div>
  );
}
