'use server';

import { apiClient } from '@/config/api-client';
import { Address } from '@/features/address/types';
import { TAGS as CART_TAGS } from '@/features/cart/constants';
import { CreditCard } from '@/features/payment/types';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { COOKIES } from '../constants';

type CheckoutPayload = {
  address: Address;
  creditCard: CreditCard | null;
  paymentMethodId: string;
};

export async function updateCheckout(
  prevState: void | null,
  { address, creditCard, paymentMethodId }: CheckoutPayload
) {
  try {
    await updateCheckoutAddress(address);
    await advanceCheckout();

    // 以下マスターナンバー使わないで分岐する
    if (paymentMethodId === '1' && creditCard) {
      await updateCreditCardCheckoutPayment(creditCard);
    } else if (paymentMethodId === '2') {
      await updatePayPayCheckoutPayment(paymentMethodId);
    } else if (paymentMethodId === '3') {
      // TODO: すでにnameとemailがあるので、それを使う
      await updateKonbiniCheckoutPayment({
        paymentMethodId,
        name: '山田 太郎',
        email: 'customer@example.com'
      });
    } else {
      console.error('Invalid payment method');
      throw new Error('Invalid payment method');
    }

    await advanceCheckout();
  } catch (error) {
    console.error(error);
  }
  redirect('/checkout/confirm');
}

export async function updateCheckoutAddress(address: Address) {
  const billAddressAttributes = {
    firstname: address.attributes.firstname || '',
    lastname: address.attributes.lastname || '',
    firstname_katakana: address.attributes.firstname_katakana || '',
    lastname_katakana: address.attributes.lastname_katakana || '',
    address1: address.attributes.address1 || '',
    city: address.attributes.city || '',
    phone: address.attributes.phone || '',
    zipcode: address.attributes.zipcode || '',
    state_name: address.attributes.state_name || '',
    country_iso: 'JP'
  };

  try {
    await apiClient.PATCH('/api/v2/storefront/checkout', {
      body: {
        order: {
          bill_address_attributes: billAddressAttributes,
          use_billing: true
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateCreditCardCheckoutPayment(creditCard: CreditCard) {
  try {
    await apiClient.PATCH('/api/v2/storefront/checkout', {
      body: {
        order: {
          existing_card: creditCard.id
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updatePayPayCheckoutPayment(selectedPaymentMethodId: string) {
  try {
    await apiClient.PATCH('/api/v2/storefront/checkout', {
      body: {
        order: {
          payments_attributes: [
            {
              payment_method_id: selectedPaymentMethodId
            }
          ]
        }
      }
    });
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function updateKonbiniCheckoutPayment({
  paymentMethodId,
  name,
  email
}: {
  paymentMethodId: string;
  name: string;
  email: string;
}) {
  try {
    await apiClient.PATCH('/api/v2/storefront/checkout', {
      body: {
        order: {
          payments_attributes: [
            {
              payment_method_id: paymentMethodId,
              source_attributes: {
                name,
                email
              }
            }
          ]
        }
      }
    });
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function updateCheckoutShipments() {
  const { data, error } = await apiClient.GET('/api/v2/storefront/checkout/shipping_rates');

  if (error) {
    throw error;
  }

  const { data: shipments } = data;

  const shipmentsAttributes = shipments.map((shipment) => ({
    id: shipment.id || '',
    selected_shipping_rate_id: shipment.relationships.shipping_rates?.data?.[0]?.id || ''
  }));

  try {
    await apiClient.PATCH('/api/v2/storefront/checkout', {
      body: {
        order: {
          shipments_attributes: shipmentsAttributes
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export async function advanceCheckout() {
  try {
    const { data, error } = await apiClient.PATCH('/api/v2/storefront/checkout/advance');

    if (error) {
      throw error;
    }

    const { data: cart } = data;

    revalidateTag(CART_TAGS.cart);

    return cart;
  } catch (error) {
    console.error(error);
  }
}

type CompleteCheckoutPayload = {
  paymentMethodId: number;
  orderNumber: string;
  amount: number;
};

/**
 * 最終的な決済処理を行い、成功時はリダイレクト先（または外部決済画面）へ飛ばす。
 * 失敗時はエラーを返却し、リダイレクトしない。
 */
export async function completeCheckout(payload: CompleteCheckoutPayload) {
  const { paymentMethodId, orderNumber, amount } = payload;

  let success = false;
  let errorMessage: string | null = null;
  let redirectUrl: string | null = null;

  try {
    if (paymentMethodId === 1) {
      // --- クレジットカード処理 ---
      const response = await apiClient.PATCH('/api/v2/storefront/checkout/complete');
      if (response.error) {
        throw new Error('クレジットカード決済の処理に失敗しました');
      }

      // カートの最新化
      revalidateTag(CART_TAGS.cart);

      // リダイレクト先: チェックアウト完了画面
      redirectUrl = '/checkout/complete';
      success = true;
    } else if (paymentMethodId === 2) {
      // --- PayPay 処理 ---
      console.log('PayPay決済の処理を開始します');

      const body = {
        order_number: orderNumber,
        amount,
        is_mobile: false
      };
      const response = await apiClient.POST('/api/v2/storefront/paypay_payments', { body });
      const { data } = response;

      if (!data?.success) {
        throw new Error('PayPay決済の処理に失敗しました');
      }

      const payPayUrl = data?.paypay_url;
      if (!payPayUrl) {
        throw new Error('PayPay urlが取得できませんでした');
      }

      // リダイレクト前にカートの再検証やクッキーの設定
      revalidateTag(CART_TAGS.cart);
      cookies().set(COOKIES.checkoutCompletedOrderNumber, orderNumber, {
        maxAge: 60 * 10 // 10分
      });
      cookies().delete(COOKIES.activeCouponId);

      // リダイレクト先: PayPay 決済ページ
      redirectUrl = payPayUrl;
      success = true;
    } else {
      // --- 未対応の支払い方法 ---
      throw new Error(`Unsupported payment method: ${paymentMethodId}`);
    }
  } catch (error) {
    console.error(error);
    errorMessage = String(error);
  }

  // エラーが起きて成功しなかった場合はリダイレクトせずエラー情報を返す
  if (!success) {
    return {
      success: false,
      error: errorMessage,
      paypayUrl: null
    };
  }

  // 成功時のみリダイレクト
  if (redirectUrl) {
    redirect(redirectUrl);
  }

  // ここに到達するのは型的に想定しておきたいだけなので、念のため返却
  return { success: true };
}

export async function completeKonbiniCheckout() {
  try {
    const response = await apiClient.PATCH('/api/v2/storefront/checkout/complete', {
      params: {
        query: {
          include: 'payments'
        }
      }
    });
    const { data, error } = response;

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}
