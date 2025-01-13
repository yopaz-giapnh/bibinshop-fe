import Paypay from '@/assets/payment/paypay.svg';
import { Typography } from '@/components/ui/typography';
import { Cart } from '@/features/cart/types';
import { CreditCard } from '@/features/payment/types';
import {
  getCreditCardBrandIcon,
  isCreditCardPaymentMethod,
  isKonbiniPaymentMethod,
  isPayPayPaymentMethod
} from '@/features/payment/utils';
import { Order } from '../types';
import OrderDetailSection from './order-detail-section';

type Props = {
  item: Cart | Order;
  creditCard: CreditCard | undefined;
};

export function OrderDetailPaymentMethod({ item, creditCard }: Props) {
  const paymentMethodName =
    item.payments?.[item.payments.length - 1]?.attributes.payment_method_name;
  const isCreditCardUsed = creditCard && isCreditCardPaymentMethod(paymentMethodName);
  const isPayPayUsed = isPayPayPaymentMethod(paymentMethodName);
  const isKonibiUsed = isKonbiniPaymentMethod(paymentMethodName);

  return (
    <OrderDetailSection title="お支払い方法">
      {isCreditCardUsed ? (
        <div className="mt-[8px] flex items-center md:mt-[16px]">
          {getCreditCardBrandIcon(creditCard)}
          <Typography as="caption" element="p" className="ml-[16px] text-[14px] text-black-90">
            {`${creditCard.attributes.cc_type} ...${creditCard.attributes.last_digits}`}
          </Typography>
        </div>
      ) : isPayPayUsed ? (
        <div className="mt-[8px] flex items-center md:mt-[16px]">
          <Paypay />
          <Typography as="caption" element="p" className="ml-[16px] text-[14px] text-black-90">
            PayPay
          </Typography>
        </div>
      ) : null}
    </OrderDetailSection>
  );
}
