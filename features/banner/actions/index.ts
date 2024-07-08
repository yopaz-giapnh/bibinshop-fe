'use server';

import { apiClient } from '@/config/api-client';

export async function getBanners() {
  const { data, error } = await apiClient.GET('/api/v2/storefront/banners');
  if (error) {
    throw error;
  }
  const banners = data.data.map((b) => ({
    title: b.attributes.title,
    linkUrl: b.attributes.link,
    imageUrl: b.attributes.image,
    mobileImageUrl: b.attributes.mobile_image,
    id: b.id,
    backgroundColor: '#EEEAD7'
  }));
  return banners;
}
