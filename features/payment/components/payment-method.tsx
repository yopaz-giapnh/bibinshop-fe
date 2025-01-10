import Amex from '@/assets/payment/amex.svg';
import Cup from '@/assets/payment/cup.svg';
import Diners from '@/assets/payment/diners.svg';
import Discover from '@/assets/payment/discover.svg';
import Eftops from '@/assets/payment/eftops.svg';
import FamilyMart from '@/assets/payment/family-mart.svg';
import Jcb from '@/assets/payment/jcb.svg';
import Lawson from '@/assets/payment/lawson.svg';
import MasterCard from '@/assets/payment/master-card.svg';
import PayPay from '@/assets/payment/paypay.svg';
import Visa from '@/assets/payment/visa.svg';
import { Typography } from '@/components/ui/typography';

export function PaymentMethod() {
  return (
    <div className="mb-[30px] w-full rounded-[6px] bg-white-base px-4 py-[19px] shadow-base">
      <Typography as="title" element="p" className="text-[16px] text-text-100 md:text-[20px]">
        支払い方法
      </Typography>

      <div className="mt-4 grid grid-cols-5 gap-x-4 gap-y-6">
        <Visa />
        <MasterCard />
        <Jcb />
        <Amex />
        <Diners />
        <Discover />
        <Cup />
        <Eftops />
        <PayPay />
        <FamilyMart />
        <Lawson />

      </div>
    </div>
  );
}
