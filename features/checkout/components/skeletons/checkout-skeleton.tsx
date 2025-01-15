import { CheckoutAddressFormSkeleton } from './checkout-address-form-skeleton';
import { CheckoutCartFormSkeleton } from './checkout-cart-form-skeleton';
import { CheckoutPaymentFormSkeleton } from './checkout-payment-form-skeleton';
import { CheckoutUsePointFormSkeleton } from './checkout-use-point-form-skeleton';
import { OrderOverviewSkeleton } from './order-overview-skeleton';

export const CheckoutSkeleton = () => (
  <div className="h-full w-full bg-paleFrostBlue px-[8px] md:px-0">
    <div className="mx-auto flex w-full flex-col items-center md:pb-[80px]">
      <div className="flex h-full w-full flex-col">
        <div className="mt-[16px] w-full md:mt-[22px] md:px-20">
          <div className="gap-6 md:flex">
            <div className="w-full flex-1 flex-col gap-4 md:flex md:px-2">
              {/* 配送先住所 */}
              <div className="mt-2 flex flex-col rounded-[6px] bg-white-base p-4 md:gap-4">
                <div className="mb-2 text-[25px] font-bold">1. お届け先住所</div>
                <CheckoutAddressFormSkeleton />
              </div>

              {/* 支払い方法 */}
              <div className="mt-2 flex flex-col gap-4 rounded-[6px] bg-white-base p-4">
                <div className="mb-2 text-[25px] font-bold">2. お支払い方法</div>
                <CheckoutPaymentFormSkeleton />
              </div>

              {/* カート内容確認 */}
              <div className="mt-2 flex flex-col gap-4 rounded-[6px] bg-white-base p-4">
                <div className="mb-2 text-[25px] font-bold">3. カート内容確認</div>
                <CheckoutCartFormSkeleton />
              </div>

              {/* ポイント使用 */}
              <div className="mt-2 flex flex-col gap-4 rounded-[6px] bg-white-base p-4">
                <div className="mb-2 text-[25px] font-bold">4. ポイント使用</div>
                <CheckoutUsePointFormSkeleton />
              </div>
            </div>

            {/* 注文概要 */}
            <div className="sticky top-4 mt-4 flex-none md:mt-2 md:w-[424px]">
              <OrderOverviewSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
