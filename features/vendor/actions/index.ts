import { apiClient } from '@/config/api-client';
import { isNotFound } from '@/utils/api';
import { TAGS } from '../constants';
import { VendorImage } from '../types';
import { isVendorImageIncludes } from '../utils';

export async function getVendor(vendorId: string) {
  const { response, data, error } = await apiClient.GET('/api/v2/storefront/vendors/{id}', {
    params: {
      path: {
        id: vendorId
      },
      query: {
        include: 'image'
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { revalidate: 3600, tags: [TAGS.vendors] } });
    }
  });

  if (isNotFound(response)) {
    return;
  }

  if (error) {
    throw new Error(error.error);
  }

  const { data: vendor, included } = data;

  const vendorImages = included?.filter(isVendorImageIncludes) || [];

  return {
    ...vendor,
    vendorImages: reshapeImages(vendorImages)
  };
}

const reshapeImages = (vendorImage: VendorImage[]) => {
  return vendorImage.map((image) => ({
    ...image,
    url: `${process.env.NEXT_PUBLIC_IMAGE_HOST}${image.attributes.styles?.[image.attributes.styles.length - 1].url}`
  }));
};
