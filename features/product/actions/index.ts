'use server';

import { apiClient } from '@/config/api-client';
import { getRootTaxons } from '@/features/taxon/actions';
import { TAGS } from '../constants';
import {
  Product,
  ProductsListParameters,
  PurchaseProductsListParameters,
  ShippingMethodIncludes,
  ShippingMethodSchema
} from '../types';
import { isCalculatorSchema } from '../utils';
import { reshapeProduct, reshapeProducts } from '../utils/reshape';

export async function getProducts(params?: ProductsListParameters) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/products', {
    params: {
      query: {
        include: 'images,vendor,product_properties,vendor.banner_image',
        'filter[in_stock]': true,
        ...params?.query
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { tags: [TAGS.products] }, cache: 'no-store' });
    }
  });

  if (error) {
    throw error;
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

export async function getPurchasedProducts(params?: PurchaseProductsListParameters) {
  const res = await getProducts({
    query: {
      'filter[ordered_user_ids]': params?.orderedUserId,
      page: params?.page,
      per_page: params?.perPage
    }
  });

  return res;
}

export async function getProduct(product_slug: string) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/products/{product_slug}', {
    params: {
      path: {
        product_slug
      },
      query: {
        include:
          'images,product_properties,vendor,variants,default_variant,option_types,option_types.option_values',
        'filter[in_stock]': true
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { tags: [TAGS.products] }, cache: 'no-store' });
    }
  });

  if (error) {
    return;
  }

  const { data: product, included } = data;

  return reshapeProduct({
    product,
    productIncluded: included
  });
}

export async function getProductsOnTaxons(taxonIds: string[], page?: string, sort_by?: string) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/products', {
    params: {
      query: {
        'filter[taxons]': taxonIds.join(','),
        page: Number(page || 1),
        include:
          'images,vendor,product_properties,default_variant,option_types,option_types.option_values',
        'filter[in_stock]': true,
        ...(sort_by && { sort_by })
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { tags: [TAGS.products] }, cache: 'no-store' });
    }
  });

  if (error) {
    throw error;
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

export async function getTaxonId(title: string) {
  const taxons = await getRootTaxons(['name']);

  return taxons.find((taxon) => taxon.attributes.name === title)?.id;
}

export async function getShippingMethods() {
  const { data, error } = await apiClient.GET('/api/v2/storefront/shipping_methods', {
    params: {
      query: {
        include: 'calculator'
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { tags: [TAGS.shippingMethods] }, cache: 'no-store' });
    }
  });

  if (error) {
    throw error;
  }

  const { data: shippingMethods, included: shippingMethodIncluded } = data;

  return reshapeShippingMethods({
    shippingMethods,
    included: shippingMethodIncluded
  });
}

function reshapeShippingMethods({
  shippingMethods,
  included
}: {
  shippingMethods: ShippingMethodSchema[];
  included?: ShippingMethodIncludes[];
}) {
  const allCalculators = included?.filter(isCalculatorSchema) || [];

  return shippingMethods.map((shippingMethod) => {
    const calculator = allCalculators.find(
      (c) => c.id === shippingMethod.relationships.calculator?.data?.id
    );

    return {
      ...shippingMethod,
      calculator
    };
  });
}

export async function getBrowseHistory(page?: number) {
  const { ids, metadata } = await listProductBrowseHistory(page);
  if (ids.length === 0) {
    return { data: [], metadata };
  }

  const product = await getProducts({ query: { 'filter[ids]': ids.join(',') } });

  return { data: product.data, metadata };
}

async function listProductBrowseHistory(page?: number) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/account/recently_viewed', {
    cache: 'no-cache',
    params: {
      query: {
        page,
        per_page: 12,
        sort: '-updated_at'
      }
    }
  });

  if (error) {
    throw error;
  }

  return { ids: data.data.map((h) => h.attributes.product_id), metadata: data.meta };
}

export async function deleteHistoryEntry(product: Product) {
  const { error } = await apiClient.DELETE('/api/v2/storefront/account/recently_viewed/{id}', {
    params: {
      path: {
        id: product.id
      }
    }
  });

  if (error) {
    throw error;
  }
}
