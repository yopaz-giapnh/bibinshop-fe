'use server';

import { apiClient } from '@/config/api-client';
import { isAddressSchema } from '@/features/address/utils';
import { isCreditCardSchema } from '@/features/payment/utils';
import { isImageSchema, isVariantSchema } from '@/features/product/utils';
import { isVendorSchema } from '@/features/vendor/utils';
import { isNotFound } from '@/utils/api';
import { isClientError } from '@/utils/error';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { COOKIES, TAGS } from '../constants';
import { CartIncludes, CartSchema, LineItem } from '../types';
import { isLineItemIncludes, isVendorTotalsIncludes } from '../utils';

export async function getCart({ cache = 'no-store' }: { cache?: RequestCache } = {}) {
  const { response, error, data } = await apiClient.GET('/api/v2/storefront/cart', {
    params: {
      query: {
        include:
          'line_items,vendors,vendor_totals,payments.source,billing_address,variants.images,vendors.banner_image'
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { tags: [TAGS.cart] }, cache });
    }
  });

  if (isNotFound(response)) {
    return null;
  }

  if (error) {
    throw error;
  }

  const { data: cart, included } = data;

  return reshapeCart({
    cart,
    included
  });
}

export async function createCart() {
  const { error, data } = await apiClient.POST('/api/v2/storefront/cart');

  if (error) {
    throw new Error(error);
  }

  const { data: cart, included } = data;

  return reshapeCart({
    cart,
    included
  });
}

export async function addItem(
  prevState: {
    success: boolean;
    message: string;
  } | null,
  { variantId, quantity }: { variantId: string; quantity: number }
) {
  let cart = await getCart();
  if (!cart) {
    cart = await createCart();
    const cartToken = cart.attributes.token;
    if (cartToken) {
      cookies().set(COOKIES.cartToken, cartToken);
    }
  }

  if (cart.attributes.item_count && cart.attributes.item_count + quantity >= 24) {
    return {
      success: false,
      message: '申し訳ありませんが、上限に達しました。'
    };
  }

  try {
    const { error } = await apiClient.POST('/api/v2/storefront/cart/add_item', {
      body: {
        variant_id: variantId,
        quantity
      }
    });

    if (error) {
      throw error;
    }

    revalidateTag(TAGS.cart);

    return {
      success: true,
      message: 'カートに追加しました'
    };
  } catch (e) {
    console.error(e);

    return {
      success: false,
      message: isClientError(e) ? e.error : 'カートの追加に失敗しました'
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

export async function associateCart({ accessToken }: { accessToken: string }) {
  try {
    const cartToken = cookies().get(COOKIES.cartToken);
    if (!cartToken) {
      return;
    }

    await apiClient.PATCH('/api/v2/storefront/cart/associate', {
      headers: {
        accept: 'application/vnd.api+json',
        Authorization: `Bearer ${accessToken}`
      },
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

function reshapeCart({
  cart,
  included
}: {
  cart: CartSchema;
  included: CartIncludes[] | undefined;
}) {
  const lineItems = included?.filter(isLineItemIncludes) || [];
  const vendorTotals = included?.filter(isVendorTotalsIncludes) || [];
  const creditCard = included?.find(isCreditCardSchema);
  const address = included?.find(isAddressSchema);
  const variants = included?.filter(isVariantSchema) || [];
  const images = included?.filter(isImageSchema) || [];
  const vendors = included?.filter(isVendorSchema) || [];

  const reshapedVendors = vendors.map((vendor) => {
    return {
      ...vendor
    };
  });

  return {
    ...cart,
    lineItems,
    vendorTotals,
    creditCard,
    address,
    variants,
    images,
    vendors: reshapedVendors
  };
}
