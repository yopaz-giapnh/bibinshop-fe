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
  creditCard: CreditCard;
};

export async function updateCheckout(
  prevState: void | null,
  { address, creditCard }: CheckoutPayload
) {
  try {
    await updateCheckoutAddress(address);
    await advanceCheckout();

    await updateCheckoutPayment(creditCard);
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

export async function updateCheckoutPayment(creditCard: CreditCard) {
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
