'use server';

import { revalidateTag } from 'next/cache';
import { TAGS } from '../constants';

export async function addItem(prevState: any, form: object) {
  try {
    console.log('Adding item to cart', prevState, form);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    revalidateTag(TAGS.address);

    return {
      success: true,
      message: 'Item added to cart'
    };
  } catch (e) {
    return {
      success: false,
      message: 'Error adding item to cart'
    };
  }
}
