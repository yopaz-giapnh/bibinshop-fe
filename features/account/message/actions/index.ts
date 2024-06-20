'use server';

import { apiClient } from '@/config/api-client';
import { isVendorImageSchema, isVendorSchema } from '@/features/vendor/utils';
import { revalidateTag } from 'next/cache';
import { TAGS } from '../constants';
import { MessageIncludes, MessageSchema } from '../types';

export async function getAccountMessages({ page }: { page?: number } = {}) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/notifications', {
    params: {
      query: {
        include: 'vendor.image',
        page
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { tags: [TAGS.messages] } });
    }
  });

  if (error) {
    throw error;
  }

  const { data: messages, included, meta } = data;

  return {
    data: reshapeMessages({ messages, included }),
    meta
  };
}

export async function getAccountMessageDetail({ id }: { id: string }) {
  const { data, error } = await apiClient.GET(`/api/v2/storefront/notifications/{id}`, {
    params: {
      query: {
        include: 'vendor.image'
      },
      path: { id }
    }
  });

  if (error) {
    throw error;
  }

  // NOTE: 既読処理があるので、revalidateする
  revalidateTag(TAGS.messages);

  const { data: message, included } = data;
  const vendor = included?.find(isVendorSchema);
  const vendorImage = included?.find(isVendorImageSchema);

  return {
    ...message,
    vendor,
    vendorImage
  };
}

function reshapeMessages({
  messages,
  included
}: {
  messages: MessageSchema[];
  included?: MessageIncludes[];
}) {
  const allVendors = included?.filter(isVendorSchema) || [];
  const allVendorImages = included?.filter(isVendorImageSchema) || [];

  return messages.map((message) => {
    const vendor = allVendors?.find(
      (vendor) => vendor.id === message.relationships.vendor?.data?.id
    );
    const vendorImage = allVendorImages?.find(
      (vendorImage) => vendorImage.id === vendor?.relationships.image?.data?.id
    );

    return {
      ...message,
      vendor,
      vendorImage
    };
  });
}
