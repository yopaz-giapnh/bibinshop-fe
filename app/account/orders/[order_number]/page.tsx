import { getOrder } from '@/features/account/order-history/actions';
import OrderHistoryDetail from '@/features/account/order-history/components/order-history-detail';
import { notFound } from 'next/navigation';

/**
 * 注文内容ホーム画面
 * @returns JSX.Element
 */
export default async function Page({ params }: { params: { order_number: string } }) {
  const order = await getOrder(params.order_number);

  if (!order) return notFound();

  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center bg-paleFrostBlue p-[24px]">
      <OrderHistoryDetail order={order} />
    </div>
  );
}
