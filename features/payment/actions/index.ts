'use server';

import { apiClient } from '@/config/api-client';
import { Token } from '@stripe/stripe-js';
import { revalidateTag } from 'next/cache';
import { TAGS } from '../constants';
import { AccountCreditState } from '../types';

export async function getAccountCreditCards() {
  const { data, error } = await apiClient.GET('/api/v2/storefront/account/credit_cards', {
    fetch: (request) => {
      return fetch(request, { next: { tags: [TAGS.accountCreditCards] } });
    }
  });

  if (error) {
    throw new Error(error.error);
  }

  const { data: accountCreditCards } = data;

  return accountCreditCards;
}

export async function deleteAccountCreditCard(prevState: AccountCreditState, id: string) {
  try {
    await apiClient.DELETE('/api/v2/storefront/account/credit_cards/{id}', {
      params: {
        path: {
          id
        }
      }
    });

    revalidateTag(TAGS.accountCreditCards);

    return {
      success: true,
      message: 'クレジットカードが削除されました。'
    };
  } catch (e) {
    console.error(e);

    return {
      success: false,
      message: 'クレジットカードの削除に失敗しました。',
      description: 'もう一度お試しください。'
    };
  }
}

export async function getPaymentMethods() {
  const { data: checkoutPaymentMethodsResponse } = await apiClient.GET(
    '/api/v2/storefront/checkout/payment_methods'
  );

  return checkoutPaymentMethodsResponse?.data;
}

export async function createPayment({
  token,
  cardHolderName,
  paymentMethodId
}: {
  token: Token;
  cardHolderName: string;
  paymentMethodId: string;
}) {
  try {
    const checkoutResponse = await apiClient.PATCH('/api/v2/storefront/checkout', {
      body: {
        order: {
          payments_attributes: [
            {
              payment_method_id: paymentMethodId,
              source_attributes: {
                gateway_payment_profile_id: token.id,
                cc_type: token.card?.brand,
                last_digits: token.card?.last4,
                month: token.card?.exp_month,
                year: token.card?.exp_year,
                name: cardHolderName
              }
            }
          ]
        }
      }
    });

    revalidateTag(TAGS.accountCreditCards);

    console.log(checkoutResponse);
  } catch (error) {
    console.error(error);
  }
}
