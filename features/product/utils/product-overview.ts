import { apiClient } from '@/config/api-client';
import { isImageProductInclude } from '@/utils/product';
import { ProductOverviewType } from '../types/product-overview';

export async function getProducts() {
  const response = await apiClient.GET('/api/v2/storefront/products', {
    params: {
      query: {
        include: 'images'
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { revalidate: 5 } });
    }
  });

  if (response.error) {
    throw new Error(response);
  }

  const { data, included } = response.data;

  const imageIncluded = included?.filter(isImageProductInclude);

  // TODO: 暫定実装
  const products = data.map((product) => ({
    ...product,
    imageUrl: `${process.env.NEXT_PUBLIC_IMAGE_HOST}${
      imageIncluded?.find((image) =>
        product.relationships.images?.data?.find((i) => i?.id === image.id)
      )?.attributes.styles?.[2].url
    }`
  }));

  return products;
}

export function getTitle(type: ProductOverviewType) {
  switch (type) {
    case 'bestsellers':
      return 'ベストセラー';
    case 'new':
      return '新着';
    case 'ranking':
      return 'ランキング';
  }
}

export function getSeeMoreUrl(type: ProductOverviewType) {
  switch (type) {
    case 'bestsellers':
      return '/products/bestsellers';
    case 'new':
      return '/products/new';
    case 'ranking':
      return '/products/ranking';
  }
}
