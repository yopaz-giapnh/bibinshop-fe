import Paypay from '@/assets/payment/paypay.svg';
// TODO: コンビニ決済審査通過後に表示
// import Konbini from '@/assets/payment/store.svg';
import { Typography } from '@/components/ui/typography';
import { Cart } from '@/features/cart/types';
import {
  getCreditCardBrandIcon,
  isCreditCardPaymentMethod,
  // isKonbiniPaymentMethod,
  isPayPayPaymentMethod
} from '@/features/payment/utils';
import { Order } from '../types';
import OrderDetailSection from './order-detail-section';

type Props = {
  item: Cart | Order;
};

export function OrderDetailPaymentMethod({ item }: Props) {
  const creditCard = item.creditCard;
  const paymentMethodName =
    item.payments?.[item.payments.length - 1]?.attributes.payment_method_name;
  const isCreditCardUsed = creditCard && isCreditCardPaymentMethod(paymentMethodName);
  const isPayPayUsed = isPayPayPaymentMethod(paymentMethodName);
  // TODO: コンビニ決済審査通過後に表示
  // const isKonbiniUsed = isKonbiniPaymentMethod(paymentMethodName);

  return (
    <OrderDetailSection title="お支払い方法">
      {isCreditCardUsed ? (
        <div className="mt-[8px] flex items-center md:mt-[16px]">
          <div className="flex items-center justify-center rounded-md border border-black-10 p-1">
            {getCreditCardBrandIcon(creditCard)}
          </div>
          <Typography as="caption" element="p" className="ml-[16px] text-[14px] text-black-90">
            {`${creditCard.attributes.cc_type} ...${creditCard.attributes.last_digits}`}
          </Typography>
        </div>
      ) : isPayPayUsed ? (
        <div className="mt-[8px] flex items-center md:mt-[16px]">
          <div className="flex items-center justify-center rounded-md border border-black-10 p-1">
            <Paypay />
          </div>
          <Typography as="caption" element="p" className="ml-[16px] text-[14px] text-black-90">
            PayPay
          </Typography>
        </div>
      ) : // TODO: コンビニ決済審査通過後に表示
      // : isKonbiniUsed ? (
      //   <div className="mt-[8px] flex items-center md:mt-[16px]">
      //     <div className="flex items-center justify-center rounded-md border border-black-10 p-1">
      //       <Konbini />
      //     </div>
      //     <Typography as="caption" element="p" className="ml-[16px] text-[14px] text-black-90">
      //       コンビニ決済
      //     </Typography>
      //   </div>
      // )
      null}
    </OrderDetailSection>
  );
}
