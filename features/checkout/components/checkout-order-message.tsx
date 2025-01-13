import { Typography } from '@/components/ui/typography';
import { getOrder } from '@/features/account/order-history/actions';
import { isKonbiniPaymentMethod } from '@/features/payment/utils';

type Props = {
  orderNumber: string;
};

export async function CheckoutOrderMessage({ orderNumber }: Props) {
  const order = await getOrder(orderNumber);
  const paymentMethodName =
    order?.payments?.[order.payments.length - 1]?.attributes.payment_method_name;
  const isKonbiniUsed = isKonbiniPaymentMethod(paymentMethodName);

  return (
    <div className="flex flex-col items-center">
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
        {isKonbiniUsed
          ? 'できるだけ早くお支払いください、延滞したご注文は自動的にキャンセルされます。'
          : 'ご注文を承りました。'}
      </Typography>
    </div>
  );
}
