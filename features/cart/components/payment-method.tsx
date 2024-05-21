import MasterCard from '@/assets/payment/master-card.svg';
import Visa from '@/assets/payment/visa.svg';
import { Typography } from '@/components/ui/typography';

export function PaymentMethod() {
  return (
    <div className="w-full rounded-[6px] bg-white-base px-4 py-[19px] shadow-base">
      <Typography as="title" element="p" className="text-text-100">
        支払い方法
      </Typography>

      <div className="mt-4 flex gap-4">
        <Visa />
        <MasterCard />
      </div>
    </div>
  );
}
