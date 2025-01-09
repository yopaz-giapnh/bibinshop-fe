import { Typography } from '@/components/ui/typography';
import { Cart } from '@/features/cart/types';
import { CreditCard } from '@/features/payment/types';
import { getCreditCardBrandIcon } from '@/features/payment/utils';
import OrderDetailSection from './order-detail-section';

type Props = {
  cart: Cart;
  creditCard: CreditCard;
};

export function OrderDetailPaymentMethod({ cart, creditCard }: Props) {
  const paymentMethodName = cart.payments.find((payment) => payment.attributes.payment_method_id)
    ?.attributes.payment_method_name;

  const isCreditCardUsed = paymentMethodName?.toLowerCase() === 'stripe';
  const isPayPayUsed = paymentMethodName?.toLowerCase() === 'paypay';

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
          {/* <img
            src="/images/paypay/paypay_logo.svg"
            alt="PayPay"
            className="h-[24px] w-[24px] object-contain"
          /> */}
          <Typography as="caption" element="p" className="ml-[16px] text-[14px] text-black-90">
            PayPay
          </Typography>
        </div>
      ) : null}
    </OrderDetailSection>
  );
}
