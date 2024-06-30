import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { OrderDetail } from '@/features/order/components/order-detail';
import { redirectToTop } from '@/utils/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Suspense } from 'react';
import { COOKIES } from '../constants';

export default async function CheckoutComplete() {
  const orderNumber = cookies().get(COOKIES.checkoutCompletedOrderNumber)?.value;
  if (!orderNumber) {
    return redirectToTop();
  }

  return (
    <div className="h-full w-full bg-paleFrostBlue">
      <div className="mx-auto flex w-full flex-col items-center px-2 md:px-[272px] md:pt-[24px] ">
        <Typography
          as="boldTitle"
          element="h2"
          className="mt-[16px] text-[16px] text-text-100 md:mt-0 md:text-[24px]"
        >
          ご購入ありがとうございました
        </Typography>
        <Typography
          as="caption"
          element="p"
          className="pb-[16px] pt-[16px] text-text-80 md:pb-[24px]"
        >
          ご注文を承りました。
        </Typography>
        <Suspense fallback={<LoadingSpinner />}>
          <OrderDetail orderNumber={orderNumber} />
          <Link href="/" passHref>
            <Button
              size="lg"
              variant="lg"
              className="mt-[24px] h-[48px] w-[350px] md:h-[55px] md:w-[392px] "
            >
              お買い物を続ける
            </Button>
          </Link>
        </Suspense>
      </div>
    </div>
  );
}
