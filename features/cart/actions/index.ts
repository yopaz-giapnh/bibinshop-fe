'use server';

import { apiClient } from '@/config/api-client';
import { isNotFound } from '@/utils/api';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { COOKIES, TAGS } from '../constants';
import { LineItem } from '../types';
import { isLineItemIncludes, isVendorTotalsIncludes } from '../utils';

export async function getCart() {
  const { response, error, data } = await apiClient.GET('/api/v2/storefront/cart', {
    params: {
      query: {
        include: 'line_items,vendors,vendor_totals'
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { tags: [TAGS.cart] }, cache: 'no-store' });
    }
  });

  if (isNotFound(response)) {
    return null;
  }

  if (error) {
    throw new Error(error.error);
  }

  const { data: cart } = data;

  const lineItems = data.included?.filter(isLineItemIncludes) || [];
  const vendorTotals = data.included?.filter(isVendorTotalsIncludes) || [];

  return {
    ...cart,
    lineItems,
    vendorTotals
  };
}

export async function createCart() {
  const { error, data } = await apiClient.POST('/api/v2/storefront/cart');

  if (error) {
    throw new Error(error);
  }

  const { data: cart } = data;

  const lineItems = data.included?.filter(isLineItemIncludes) || [];
  const vendorTotals = data.included?.filter(isVendorTotalsIncludes) || [];

  return {
    ...cart,
    lineItems,
    vendorTotals
  };
}

export async function addItem(
  prevState: {
    success: boolean;
  } | null,
  { productId, quantity }: { productId: string; quantity: number }
) {
  let cart = await getCart();
  if (!cart) {
    cart = await createCart();
    const cartToken = cart.attributes.token;
    if (cartToken) {
      cookies().set(COOKIES.cartToken, cartToken);
    }
  }

  try {
    await apiClient.POST('/api/v2/storefront/cart/add_item', {
      body: {
        variant_id: productId,
        quantity
      }
    });
    revalidateTag(TAGS.cart);

    return {
      success: true
    };
  } catch (e) {
    console.error(e);
    return {
      success: false
    };
  }
}

export async function removeLineItem(id: string) {
  try {
    await apiClient.DELETE('/api/v2/storefront/cart/remove_line_item/{id}', {
      params: {
        path: {
          id
        }
      }
    });

    revalidateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
  }
}

export async function setQuantity({
  lineItemId,
  quantity
}: {
  lineItemId: string;
  quantity: number;
}) {
  try {
    if (quantity === 0) {
      return removeLineItem(lineItemId);
    }

    await apiClient.PATCH('/api/v2/storefront/cart/set_quantity', {
      body: {
        line_item_id: lineItemId,
        quantity
      }
    });

    revalidateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
  }
}

export async function updateItemQuantity({
  lineItem,
  type
}: {
  lineItem: LineItem;
  type: 'plus' | 'minus';
}) {
  if (lineItem.attributes.quantity == null) {
    return;
  }

  await setQuantity({
    lineItemId: lineItem.id,
    quantity: type === 'plus' ? lineItem.attributes.quantity + 1 : lineItem.attributes.quantity - 1
  });
}

export async function associateCart() {
  try {
    const cartToken = cookies().get(COOKIES.cartToken);
    if (!cartToken) {
      return;
    }

    await apiClient.PATCH('/api/v2/storefront/cart/associate', {
      params: {
        query: {
          guest_order_token: cartToken.value
        }
      }
    });
    cookies().delete(COOKIES.cartToken);

    revalidateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
  }
}
