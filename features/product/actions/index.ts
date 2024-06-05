'use server';

import { apiClient } from '@/config/api-client';
import { isVendorSchema } from '@/features/vendor/utils';
import { TAGS } from '../constants';
import { ImageSchema, ProductIncludes, ProductSchema, ProductsListParameters } from '../types';
import { isImageSchema } from '../utils';

export async function getProducts(params?: ProductsListParameters) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/products', {
    params: {
      query: {
        include: 'images,vendor',
        ...params?.query
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { revalidate: 5, tags: [TAGS.products] } });
    }
  });

  if (error) {
    throw new Error(error);
  }

  const { data: products, included: productIncluded, meta } = data;

  return {
    data: reshapeProducts({
      products,
      productIncluded
    }),
    meta
  };
}

export async function getProduct(product_slug: string) {
  const response = await apiClient.GET('/api/v2/storefront/products/{product_slug}', {
    params: {
      path: {
        product_slug
      },
      query: {
        include: 'images,product_properties,vendor'
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
  product: ProductSchema;
  productIncluded: ProductIncludes[] | undefined;
}) => {
  const imageIncluded = productIncluded?.filter(isImageSchema);
  const vendorIncluded = productIncluded?.filter(isVendorSchema)?.[0];

  return {
    ...product,
    images: reshapeImages(imageIncluded),
    vendor: vendorIncluded
  };
};

const reshapeProducts = ({
  products,
  productIncluded
}: {
  products: ProductSchema[];
  productIncluded: ProductIncludes[] | undefined;
}) => {
  const reshapedProducts = products.map((product) => {
    const imageIncluded = productIncluded?.filter(isImageSchema);
    return reshapeProduct({
      product,
      productIncluded: imageIncluded?.filter((i) =>
        product.relationships.images?.data?.some((d) => d?.id === i.id)
      )
    });
  });

  return reshapedProducts;
};

const reshapeImages = (imageProductIncluded: ImageSchema[] | undefined) => {
  if (!imageProductIncluded) {
    return [];
  }

  return imageProductIncluded.map((image) => ({
    ...image,
    url: `${process.env.NEXT_PUBLIC_IMAGE_HOST}${image.attributes.styles?.[image.attributes.styles.length - 1].url}`
  }));
};
