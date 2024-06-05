import { apiClient } from '@/config/api-client';
import { isNotFound } from '@/utils/api';
import { TAGS } from '../constants';
import { VendorImage } from '../types';
import { isVendorBannerImageIncludes, isVendorImageIncludes } from '../utils';

export async function getVendor(vendorId: string) {
  const { response, data, error } = await apiClient.GET('/api/v2/storefront/vendors/{id}', {
    params: {
      path: {
        id: vendorId
      },
      query: {
        include: 'image,banner_image'
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { revalidate: 5, tags: [TAGS.vendors] } });
    }
  });

  if (isNotFound(response)) {
    return;
  }

  if (error) {
    throw new Error(error.error);
  }

  const { data: vendor, included } = data;

  const vendorImage = included?.filter(isVendorImageIncludes)?.[0];
  const vendorBannerImage = included?.filter(isVendorBannerImageIncludes)?.[0];

  return {
    ...vendor,
    vendorImage: reshapeImage(vendorImage),
    vendorBannerImage: reshapeImage(vendorBannerImage)
  };
}

const reshapeImage = (vendorImage: VendorImage | undefined) => {
  if (!vendorImage) {
    return;
  }

  return {
    ...vendorImage,
    url: `${process.env.NEXT_PUBLIC_IMAGE_HOST}${vendorImage.attributes?.styles?.[vendorImage.attributes?.styles?.length - 1]?.url}`
  };
};
