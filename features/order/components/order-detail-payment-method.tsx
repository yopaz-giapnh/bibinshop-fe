import { Typography } from '@/components/ui/typography';
import { CreditCard } from '@/features/payment/types';
import { getCreditCardBrandIcon } from '@/features/payment/utils';
import OrderDetailSection from './order-detail-section';

type Props = {
  creditCard: CreditCard;
};

export function OrderDetailPaymentMethod({ creditCard }: Props) {
  return (
    <OrderDetailSection title="お支払い方法">
      <div className="mt-[16px] flex items-center">
        {getCreditCardBrandIcon(creditCard)}
        <Typography as="caption" element="p" className="ml-[16px] text-[14px] text-black-90">
          {`${creditCard.attributes.cc_type} ...${creditCard.attributes.last_digits}`}
        </Typography>
      </div>
    </OrderDetailSection>
  );
}
