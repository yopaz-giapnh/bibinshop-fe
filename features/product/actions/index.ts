'use server';

import { apiClient } from '@/config/api-client';
import { getRootTaxons } from '@/features/taxon/actions';
import { isVendorSchema } from '@/features/vendor/utils';
import { TAGS } from '../constants';
import {
  ImageSchema,
  Product,
  ProductIncludes,
  ProductSchema,
  ProductsListParameters,
  PurchaseProductsListParameters,
  ShippingMethodIncludes,
  ShippingMethodSchema
} from '../types';
import {
  isCalculatorSchema,
  isImageSchema,
  isOptionTypeSchema,
  isOptionValueSchema,
  isProductPropertySchema,
  isTaxonSchema,
  isVariantSchema
} from '../utils';

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
      return fetch(request, { next: { revalidate: 86400, tags: [TAGS.products] } });
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
      return fetch(request, { next: { revalidate: 86400, tags: [TAGS.products] } });
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

const reshapeProduct = ({
  product,
  productIncluded
}: {
  product: ProductSchema;
  productIncluded: ProductIncludes[] | undefined;
}) => {
  const imageIncluded = productIncluded?.filter(isImageSchema);
  const vendorIncluded = productIncluded?.filter(isVendorSchema)?.[0];
  const taxons = productIncluded?.filter(isTaxonSchema) || [];
  const productProperties = productIncluded?.filter(isProductPropertySchema) || [];
  const allVariants = productIncluded?.filter(isVariantSchema) || [];
  const optionTypes = (productIncluded?.filter(isOptionTypeSchema) || []).sort(
    (a, b) => a.attributes.position - b.attributes.position
  );
  const optionValues = (productIncluded?.filter(isOptionValueSchema) || []).sort(
    (a, b) => a.attributes.position - b.attributes.position
  );
  const optionsMap = optionTypes.reduce(
    (acc, optionType) => {
      const values = optionValues.filter(
        (value) => value.relationships.option_type?.data?.id === optionType.id
      );

      return {
        ...acc,
        [optionType.id]: values
      };
    },
    {} as Record<string, typeof optionValues>
  );
  // TODO: 購入不可な場合は表示するかどうか
  const variants = allVariants.filter((variant) => !variant.attributes.is_master);
  const defaultVariant = allVariants.find(
    (variant) => variant.id === product.relationships.default_variant?.data?.id
  );

  return {
    ...product,
    images: reshapeImages(imageIncluded),
    vendor: vendorIncluded,
    taxons,
    productProperties,
    variants,
    defaultVariant,
    optionTypes,
    optionValues,
    optionsMap
  };
};

export async function getProductsOnTaxons(taxonIds: string[], page?: string) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/products', {
    params: {
      query: {
        'filter[taxons]': taxonIds.join(','),
        page: Number(page || 1),
        include:
          'images,vendor,product_properties,default_variant,option_types,option_types.option_values'
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { revalidate: 86400, tags: [TAGS.products] } });
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

const reshapeProducts = ({
  products,
  productIncluded
}: {
  products: ProductSchema[];
  productIncluded: ProductIncludes[] | undefined;
}) => {
  const reshapedProducts = products.map((product) => {
    const imageIncluded = (productIncluded?.filter(isImageSchema) || []).filter((i) =>
      product.relationships.images?.data?.some((d) => d?.id === i.id)
    );
    const productProperties = (productIncluded?.filter(isProductPropertySchema) || []).filter((p) =>
      product.relationships.product_properties?.data?.map((pp) => pp?.id).includes(p.id)
    );
    const optionTypes = (productIncluded?.filter(isOptionTypeSchema) || []).filter((ot) =>
      product.relationships.option_types?.data?.map((otd) => otd?.id).includes(ot.id)
    );
    const optionValues = (productIncluded?.filter(isOptionValueSchema) || []).filter((ov) =>
      optionTypes.some((ot) => ov.relationships.option_type?.data?.id === ot.id)
    );

    return reshapeProduct({
      product,
      productIncluded: [...imageIncluded, ...productProperties, ...optionTypes, ...optionValues]
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
    url: `${image.attributes.styles?.[image.attributes.styles.length - 1].url}`
  }));
};

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
      return fetch(request, { next: { revalidate: 86400, tags: [TAGS.shippingMethods] } });
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

export async function addToFavorite(variantId: string) {
  const { data, error } = await apiClient.POST('/api/v2/storefront/account/favorites', {
    body: {
      favorite: {
        variant_id: variantId
      }
    }
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function removeFromFavorite(variantId: string) {
  const { error } = await apiClient.DELETE('/api/v2/storefront/account/favorites/{id}', {
    params: {
      path: {
        id: variantId
      }
    }
  });
  if (error) {
    throw error;
  }
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
