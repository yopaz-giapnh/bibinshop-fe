import { Skeleton } from '@/components/ui/skeleton';
import { CartItemListSkeleton } from './cart-item-list-skeleton';
import { OrderOverviewSkeleton } from './order-overview-skeleton';
import { PaymentMethodSkeleton } from './payment-method-skeleton';

export const CartSkeleton = () => (
  <div className="h-full w-full bg-paleFrostBlue pt-[22px] md:pb-[60px] md:pt-0">
    <div className="mx-auto flex w-full flex-col items-center md:h-screen">
      <div className="flex h-full w-full flex-col">
        <div className="mt-[22px] h-full px-[8px] md:px-20">
          {/* 送料無料バナー */}
          <div className="mb-4 rounded-md bg-yellow-50 p-3">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-gray-200" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-32 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                <div className="h-5 w-5 rounded-full bg-gray-200" />
                <Skeleton className="h-4 w-48 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
              </div>
            </div>
          </div>

          {/* すべての商品 */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
              <Skeleton className="h-5 w-6 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            </div>
          </div>

          <div className="gap-6 md:flex">
            <div className="flex-1">
              <CartItemListSkeleton />
            </div>
            <div className="mt-4 flex flex-none flex-col gap-4 md:mt-0 md:w-[424px]">
              {/* クーポン適用ボタン */}
              <div className="bg-white hidden w-full rounded-md p-4 shadow-sm md:block">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-gray-200" />
                    <Skeleton className="h-4 w-24 animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                  </div>
                  <div className="h-5 w-5 rounded-full bg-gray-200" />
                </div>
              </div>

              <OrderOverviewSkeleton />
              <PaymentMethodSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
