'use server';

import { apiClient } from '@/config/api-client';
import { revalidateTag } from 'next/cache';
import { TAGS } from '../constants';
import { AddressFormData, AddressState, SearchAddressByPostcodeResponse } from '../types';

export async function getAccountAddresses() {
  const { data, error } = await apiClient.GET('/api/v2/storefront/account/addresses', {
    fetch: (request) => {
      return fetch(request, { next: { tags: [TAGS.address] } });
    }
  });

  if (error) {
    throw error;
  }

  const { data: addresses } = data;

  return addresses;
}

export async function addAccountAddress(prevState: AddressState, formData: AddressFormData) {
  try {
    await apiClient.POST('/api/v2/storefront/account/addresses', {
      body: {
        address: {
          firstname: formData.firstName,
          lastname: formData.lastName,
          firstname_katakana: formData.firstNameKana,
          lastname_katakana: formData.lastNameKana,
          address1: formData.address1,
          address2: formData.address2,
          city: formData.city,
          phone: formData.phoneNumber,
          zipcode: formData.postalCode,
          state_name: formData.prefecture,
          country_iso: 'JP',
          is_default: formData.isDefaultAddress
        }
      }
    });

    revalidateTag(TAGS.address);

    return {
      success: true,
      message: '住所が追加されました。'
    };
  } catch (e) {
    return {
      success: false,
      message: '住所の追加に失敗しました。',
      description: 'もう一度お試しください。'
    };
  }
}

export async function removeAccountAddress(prevState: AddressState, id: string) {
  try {
    await apiClient.DELETE('/api/v2/storefront/account/addresses/{id}', {
      params: {
        path: {
          id
        }
      }
    });

    revalidateTag(TAGS.address);

    return {
      success: true,
      message: '住所が削除されました。'
    };
  } catch (e) {
    console.error(e);

    return {
      success: false,
      message: '住所の削除に失敗しました。'
    };
  }
}

export async function updateAccountAddress(prevState: AddressState, formData: AddressFormData) {
  try {
    if (!formData.id) {
      throw new Error('Address ID is required');
    }

    await apiClient.PATCH('/api/v2/storefront/account/addresses/{id}', {
      params: {
        path: {
          id: formData.id
        }
      },
      body: {
        address: {
          firstname: formData.firstName,
          lastname: formData.lastName,
          firstname_katakana: formData.firstNameKana,
          lastname_katakana: formData.lastNameKana,
          address1: formData.address1,
          address2: formData.address2,
          city: formData.city,
          phone: formData.phoneNumber,
          zipcode: formData.postalCode,
          state_name: formData.prefecture,
          country_iso: 'JP',
          is_default: formData.isDefaultAddress
        }
      }
    });

    revalidateTag(TAGS.address);

    return {
      success: true,
      message: '住所が更新されました。'
    };
  } catch (e) {
    return {
      success: false,
      message: '住所の更新に失敗しました。',
      description: 'もう一度お試しください。'
    };
  }
}

export async function searchAddressByPostcode(postcode: string) {
  const response = await fetch(`https://postcode.teraren.com/postcodes/${postcode}.json`);
  const searchAddress: SearchAddressByPostcodeResponse = await response.json();

  if (searchAddress.error) {
    return;
  }

  return searchAddress;
}
