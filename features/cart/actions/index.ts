'use server';

import { revalidateTag } from 'next/cache';
import { addToCart } from '../api/cart';
import { TAGS } from '../constants';

export async function addItem(prevState: any, productId: string | null) {
  try {
    console.log('Adding item to cart', prevState, productId);
    const res = await addToCart();
    revalidateTag(TAGS.cart);

    return res;
  } catch (e) {
    return {
      success: false,
      message: 'Error adding item to cart'
    };
  }
}
