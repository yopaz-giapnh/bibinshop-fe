'use server';

import { apiClient } from '@/config/api-client';
import { isProductImageIncludes } from '@/utils/product';
import { TAGS } from '../constants';
import { ProductData, ProductImageIncludes, ProductIncludes } from '../types';

export async function getProducts() {
  const response = await apiClient.GET('/api/v2/storefront/products', {
    params: {
      query: {
        include: 'images'
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { revalidate: 5, tags: [TAGS.products] } });
    }
  });

  if (response.error) {
    throw new Error(response);
  }

  return reshapeProducts({
    products: response.data.data,
    productIncluded: response.data.included
  });
}

export async function getProduct(product_slug: string) {
  const response = await apiClient.GET('/api/v2/storefront/products/{product_slug}', {
    params: {
      path: {
        product_slug
      },
      query: {
        include: 'images,product_properties'
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { revalidate: 5, tags: [TAGS.products] } });
    }
  });

  if (response.error) {
    return;
  }

  return reshapeProduct({
    product: response.data.data,
    productIncluded: response.data.included
  });
}

const reshapeProduct = ({
  product,
  productIncluded
}: {
  product: ProductData;
  productIncluded: ProductIncludes[] | undefined;
}) => {
  const imageIncluded = productIncluded?.filter(isProductImageIncludes);

  return {
    ...product,
    images: reshapeImages(imageIncluded)
  };
};

const reshapeProducts = ({
  products,
  productIncluded
}: {
  products: ProductData[];
  productIncluded: ProductIncludes[] | undefined;
}) => {
  const reshapedProducts = products.map((product) => {
    const imageIncluded = productIncluded?.filter(isProductImageIncludes);
    return reshapeProduct({
      product,
      productIncluded: imageIncluded?.filter((i) =>
        product.relationships.images?.data?.some((d) => d?.id === i.id)
      )
    });
  });

  return reshapedProducts;
};

const reshapeImages = (imageProductIncluded: ProductImageIncludes[] | undefined) => {
  if (!imageProductIncluded) {
    return [];
  }

  return imageProductIncluded.map((image) => ({
    ...image,
    url: `${process.env.NEXT_PUBLIC_IMAGE_HOST}${image.attributes.styles?.[image.attributes.styles.length - 1].url}`
  }));
};
