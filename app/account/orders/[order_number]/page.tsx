import { getOrder } from '@/features/account/order-history/actions';
import OrderHistoryDetail from '@/features/account/order-history/components/order-history-detail';
import { getMyReviews } from '@/features/review/actions';
import { notFound } from 'next/navigation';

/**
 * 注文内容ホーム画面
 * @returns JSX.Element
 */
export default async function Page({ params }: { params: { order_number: string } }) {
  const order = await getOrder(params.order_number);
  const reviews = await getMyReviews();

  if (!order) return notFound();

  return (
    <div className="mx-auto flex w-full flex-col items-center bg-paleFrostBlue p-[16px] md:h-screen md:p-[24px]">
      <OrderHistoryDetail order={order} reviews={reviews.data} />
    </div>
  );
}
