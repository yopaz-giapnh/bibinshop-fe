import OrderHistoryTabs from '@/features/account/order-history/components/order-history-tabs';

/**
 * 注文履歴ホーム画面
 * @returns JSX.Element
 */
export default function Page() {
  return (
    <div className="mx-auto mt-[128px] flex h-screen w-full flex-col items-center bg-paleFrostBlue p-[24px]">
      <OrderHistoryTabs />
    </div>
  );
}
