import { Button } from '@/components/ui/button';
import { ResetCouponClient } from '@/features/coupon/components/reset-coupon-client';
import { OrderDetail } from '@/features/order/components/order-detail';
import { redirectToTop } from '@/utils/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Suspense } from 'react';
import { COOKIES } from '../constants';
import { AnimatedCheckoutContainer } from './animated-checkout-container';
import { CheckoutOrderMessage } from './checkout-order-message';
import { CheckoutOrderMessageSkeleton } from './skeletons/checkout-order-message-skeleton';
import { OrderDetailSkeleton } from './skeletons/order-detail-skeleton';

export default async function CheckoutComplete() {
  const orderNumber = cookies().get(COOKIES.checkoutCompletedOrderNumber)?.value;
  if (!orderNumber) {
    return redirectToTop();
  }

  return (
    <AnimatedCheckoutContainer>
      <div className="mx-auto flex w-full flex-col items-center px-2 md:px-[272px] md:pt-[24px]">
        <ResetCouponClient />
        <Suspense fallback={<CheckoutOrderMessageSkeleton />}>
          <CheckoutOrderMessage orderNumber={orderNumber} />
        </Suspense>
        <Suspense fallback={<OrderDetailSkeleton />}>
          <OrderDetail orderNumber={orderNumber} />
          <Link href="/" passHref>
            <Button
              size="lg"
              variant="lg"
              className="mt-[24px] h-[48px] w-[350px] md:h-[55px] md:w-[392px]"
            >
              お買い物を続ける
            </Button>
          </Link>
        </Suspense>
      </div>
    </AnimatedCheckoutContainer>
  );
}
