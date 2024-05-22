import OrderHistoryDetail from '@/features/account/order-history/components/order-history-detail';

/**
 * 注文内容ホーム画面
 * @returns JSX.Element
 */
export default function Page() {
  return (
    <div className="mx-auto mt-[128px] flex h-screen w-full flex-col items-center bg-paleFrostBlue p-[24px]">
      <OrderHistoryDetail />
    </div>
  );
}
