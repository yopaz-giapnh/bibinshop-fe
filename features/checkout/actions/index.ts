'use server';

import { apiClient } from '@/config/api-client';
import { Address } from '@/features/address/types';
import { getCart } from '@/features/cart/actions';
import { TAGS as CART_TAGS } from '@/features/cart/constants';
import { AvailablePaymentMethod, CreditCard } from '@/features/payment/types';
import {
  isCreditCardPaymentMethodType,
  isKonbiniPaymentMethod,
  isPayPayPaymentMethod
} from '@/features/payment/utils';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { COOKIES } from '../constants';

type CheckoutPayload = {
  address: Address;
  paymentMethod: AvailablePaymentMethod;
};

export async function updateCheckout(
  prevState: void | null,
  { address, paymentMethod }: CheckoutPayload
) {
  try {
    await updateCheckoutAddress(address);
    await advanceCheckout();

    if (isCreditCardPaymentMethodType(paymentMethod)) {
      await updateCreditCardCheckoutPayment(paymentMethod.creditCard);
    } else if (isPayPayPaymentMethod(paymentMethod.type)) {
      await updatePayPayCheckoutPayment(paymentMethod.id);
    } else if (isKonbiniPaymentMethod(paymentMethod.type)) {
      await updateKonbiniCheckoutPayment({
        paymentMethodId: paymentMethod.id,
        name: `${address.attributes.firstname} ${address.attributes.lastname}`
      });
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
  name
}: {
  paymentMethodId: string;
  name: string;
}) {
  try {
    const { error } = await apiClient.PATCH('/api/v2/storefront/checkout', {
      body: {
        order: {
          payments_attributes: [
            {
              payment_method_id: paymentMethodId,
              source_attributes: {
                name
              }
            }
          ]
        }
      }
    });

    if (error) {
      throw error;
    }
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

export async function completeCheckout() {
  try {
    const { data, error } = await apiClient.PATCH('/api/v2/storefront/checkout/complete');

    if (error) {
      throw error;
    }

    const { data: cart } = data;
    if (!cart.attributes.number) {
      throw new Error('Order number not found');
    }

    cookies().set(COOKIES.checkoutCompletedOrderNumber, cart.attributes.number, {
      maxAge: 60 * 10 // 10 minutes
    });
    // 適応中のクーポンを削除
    cookies().delete(COOKIES.activeCouponId);
  } catch (error) {
    console.error(error);
  } finally {
    revalidateTag(CART_TAGS.cart);
  }

  redirect('/checkout/complete');
}

export async function completePayPayCheckout() {
  let redirectUrl: string | null = null;

  try {
    const cart = await getCart();

    const orderNumber = cart?.attributes.number;
    const amount = Number(cart?.attributes.total);

    if (!orderNumber || amount <= 0) {
      throw new Error('決済に必要な情報が不足しています');
    }

    const body = {
      order_number: orderNumber,
      amount,
      is_mobile: false
    };

    const paymentResponse = await apiClient.POST('/api/v2/storefront/paypay_payments', {
      body
    });
    const { data } = paymentResponse;

    if (!data?.success) {
      throw new Error('PayPay決済の処理に失敗しました');
    }

    const payPayUrl = data?.paypay_url;
    if (!payPayUrl) {
      throw new Error('PayPay urlが取得できませんでした');
    }

    const completeResponse = await apiClient.PATCH('/api/v2/storefront/checkout/complete');

    if (completeResponse.error) {
      throw new Error('PayPay決済の処理に失敗しました');
    }

    // リダイレクト前にカートの再検証やクッキーの設定
    revalidateTag(CART_TAGS.cart);
    cookies().set(COOKIES.checkoutCompletedOrderNumber, orderNumber, {
      maxAge: 60 * 10 // 10分
    });
    cookies().delete(COOKIES.activeCouponId);

    // リダイレクト先: PayPay 決済ページ
    redirectUrl = payPayUrl;
  } catch (error) {
    console.error(error);
  } finally {
    revalidateTag(CART_TAGS.cart);
  }

  // 成功時のみリダイレクト
  if (redirectUrl) {
    redirect(redirectUrl);
  }
}
