import { Typography } from '@/components/ui/typography';
import PaymentEmptyView from '@/features/account/payment/components/payment-empty-view';
import { getAccountCreditCards } from '@/features/payment/actions';
import { getCreditCardBrandIcon } from '@/features/payment/utils';
import PaymentDelete from './payment-delete';

/**
 * お支払い方法ホーム下部画面
 * @returns JSX.Element
 */
export default async function PaymentList() {
  const accountCreditCards = await getAccountCreditCards();
  const hasCreditCard = accountCreditCards.length > 0;

  return hasCreditCard ? (
    <div className="mt-[24px] grid grid-cols-2 gap-4 md:grid-cols-2">
      {accountCreditCards.map((creditCard) => (
        <div key={creditCard.id}>
          <div className="flex w-[500px] items-end justify-between rounded-[6px] border border-solid border-black-10 p-4 shadow-md ">
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                {getCreditCardBrandIcon(creditCard)}
                <Typography as="bold" element="p" className="ml-[8px] text-[20px] text-black-80">
                  {creditCard.attributes.cc_type + ' Card'}
                </Typography>
              </div>
              <Typography as="body" element="p" className="text-[14px] text-black-90 ">
                {'末尾が****' + creditCard.attributes.last_digits + 'のクレジットカード'}
              </Typography>
            </div>
            <PaymentDelete creditCard={creditCard} />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <PaymentEmptyView />
  );
}
