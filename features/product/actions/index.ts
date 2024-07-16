'use server';

import { apiClient } from '@/config/api-client';
import { getRootTaxons } from '@/features/taxon/actions';
import { isVendorSchema } from '@/features/vendor/utils';
import { TAGS } from '../constants';
import {
  ImageSchema,
  ProductIncludes,
  ProductSchema,
  ProductsListParameters,
  ShippingMethodIncludes,
  ShippingMethodSchema
} from '../types';
import {
  isCalculatorSchema,
  isImageSchema,
  isProductPropertySchema,
  isTaxonSchema,
  isVariantSchema
} from '../utils';

export async function getProducts(params?: ProductsListParameters) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/products', {
    params: {
      query: {
        include: 'images,vendor,product_properties',
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

export async function getProduct(product_slug: string) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/products/{product_slug}', {
    params: {
      path: {
        product_slug
      },
      query: {
        include: 'images,product_properties,vendor,taxons,variants,default_variant',
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
  // TODO: 購入不可な場合は表示するかどうか
  const variants = allVariants.filter(
    (variant) => !variant.attributes.is_master && variant.attributes.purchasable
  );
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
    defaultVariant
  };
};

export async function getProductsOnTaxons(taxonIds: string[], page?: string) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/products', {
    params: {
      query: {
        'filter[taxons]': taxonIds.join(','),
        page: Number(page || 1),
        include: 'images,vendor,product_properties',
        'fields[product]': 'default_variant'
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

    return reshapeProduct({
      product,
      productIncluded: [...imageIncluded, ...productProperties]
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
