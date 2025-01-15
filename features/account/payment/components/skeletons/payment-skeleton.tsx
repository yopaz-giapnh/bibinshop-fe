import { PaymentCardSkeleton } from './payment-card-skeleton';

export const PaymentSkeleton = () => (
  <>
    {/* カードリスト */}
    <div className="mt-[16px] grid w-full gap-4 md:mt-[24px] md:grid-cols-2">
      {[...Array(2)].map((_, index) => (
        <PaymentCardSkeleton key={index} />
      ))}
    </div>
  </>
);
