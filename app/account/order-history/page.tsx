import { OrderHistoryTabs } from '@/features/account/order-history/components/order-history-tabs';

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
    <div className="mx-auto flex h-screen w-full flex-col items-center bg-paleFrostBlue p-[14px] md:p-[24px]">
      <OrderHistoryTabs currentPage={currentPage} tabState={tabState} />
    </div>
  );
}
