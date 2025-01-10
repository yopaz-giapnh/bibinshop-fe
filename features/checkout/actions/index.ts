'use server';

import { apiClient } from '@/config/api-client';
import { Address } from '@/features/address/types';
import { TAGS as CART_TAGS } from '@/features/cart/constants';
import { CreditCard } from '@/features/payment/types';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

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

export async function completeCheckout(
  paymentMethodId: number,
  orderNumber: string,
  amount: number
) {
  let response;

  try {
    if (paymentMethodId === 1) {
      response = await apiClient.PATCH('/api/v2/storefront/checkout/complete');
      const { error } = response;
      if (error) {
        throw error;
      }
    } else if (paymentMethodId === 2) {
      console.log('PayPay決済の処理を開始します');
      // PayPay決済用のエンドポイントを叩く: POST /api/v2/storefront/paypay_payments

      const body = {
        order_number: orderNumber,
        amount: amount,
        is_mobile: false
      };
      response = await apiClient.POST('/api/v2/storefront/paypay_payments', {
        body: body
      });

      const { data } = response;
      if (data?.success === false) {
        // 以下本当はエラートーストを出したい
        throw new Error('PayPay決済の処理に失敗しました');
      }

      // APIからのレスポンスに `redirect_url` が含まれる
      const redirect_url = data?.paypay_url;
      if (!redirect_url) {
        // 以下本当はエラートーストを出したい
        throw new Error('PayPay決済の処理に失敗しました');
      }

      redirect(redirect_url);

      // `redirect_url` に画面遷移することでPayPay側の決済画面へ移動
      // 決済が完了したら、PayPayからコールバックが返される前提
      // ここで処理は終了する（returnする）
    } else {
      throw new Error(`Unsupported payment method: ${paymentMethodId}`);
    }
  } catch (error) {
    console.error(error);
  } finally {
    revalidateTag(CART_TAGS.cart);
  }

  redirect('/checkout/complete');
}
