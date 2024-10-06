'use server';
import { apiClient } from '@/config/api-client';
import { ProductCard } from '@/features/product/components/product-card';
import { ImageSchema, Product, ProductIncludes, ProductSchema } from '@/features/product/types';
import {
  isImageSchema,
  isOptionTypeSchema,
  isOptionValueSchema,
  isProductPropertySchema,
  isProductSchema,
  isTaxonSchema,
  isVariantSchema
} from '@/features/product/utils';
import { isVendorSchema } from '@/features/vendor/utils';
import { ComponentProps } from 'react';

export async function getFavorites() {
  const { data, error } = await apiClient.GET('/api/v2/storefront/account/favorites', {
    params: {
      query: {
        include:
          'variant,variant.product,variant.product.images,variant.product.vendor,variant.product.product_properties,variant.product.vendor.banner_image'
      }
    },
    cache: 'no-cache'
  });

  if (error) {
    throw error;
  }

  const products = data.included?.filter((e) => isProductSchema(e));
  const productIncluded = data.included?.filter(
    (e) =>
      isImageSchema(e) ||
      isVendorSchema(e) ||
      isTaxonSchema(e) ||
      isProductPropertySchema(e) ||
      isVariantSchema(e) ||
      isOptionTypeSchema(e) ||
      isOptionValueSchema(e)
  );

  const reshaped = reshapeProducts({
    products: products as ProductSchema[],
    productIncluded: productIncluded as ProductIncludes[]
  });
  return data.data
    .map((f) => {
      const prod = reshaped.find((p) => {
        return p.variants.some((v) => v.id === f.relationships.variant?.data?.id);
      });
      if (!prod) {
        return null;
      }
      prod.activeVariant = prod.variants.find((v) => v.id === f.relationships.variant?.data?.id);
      return prod;
    })
    .filter((f): f is Product => f !== null);
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
    const variants = (productIncluded?.filter(isVariantSchema) || []).filter((v) =>
      product.relationships.variants?.data?.map((vd) => vd?.id).includes(v.id)
    );

    return reshapeProduct({
      product,
      productIncluded: [
        ...imageIncluded,
        ...productProperties,
        ...optionTypes,
        ...optionValues,
        ...variants
      ]
    });
  });

  return reshapedProducts;
};

const reshapeProduct = ({
  product,
  productIncluded
}: {
  product: ProductSchema;
  productIncluded: ProductIncludes[] | undefined;
}): ComponentProps<typeof ProductCard>['product'] => {
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

const reshapeImages = (imageProductIncluded: ImageSchema[] | undefined) => {
  if (!imageProductIncluded) {
    return [];
  }

  return imageProductIncluded.map((image) => ({
    ...image,
    url: `${image.attributes.styles?.[image.attributes.styles.length - 1].url}`
  }));
};

export async function deleteFavorite(product: Product) {
  const { error } = await apiClient.DELETE(`/api/v2/storefront/account/favorites/{id}`, {
    params: {
      path: {
        id: product.activeVariant?.id ?? product.defaultVariant?.id ?? product.id
      }
    }
  });

  if (error) {
    throw error;
  }
}
