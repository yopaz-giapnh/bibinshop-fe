'use server';

import { revalidateTag } from 'next/cache';
import { saveAddress } from '../api/address';
import { TAGS } from '../constants';

export async function addItem(prevState: any, form: object) {
  try {
    console.log('Adding item to cart', prevState, form);
    const res = await saveAddress();
    revalidateTag(TAGS.address);

    return res;
  } catch (e) {
    return {
      success: false,
      message: 'Error adding item to cart'
    };
  }
}
