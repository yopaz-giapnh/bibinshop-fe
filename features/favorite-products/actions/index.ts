'use server';

import { apiClient } from '@/config/api-client';
import { TAGS as PRODUCT_TAGS } from '@/features/product/constants';
import { Product, ProductIncludes, ProductSchema } from '@/features/product/types';
import {
  isImageSchema,
  isOptionTypeSchema,
  isOptionValueSchema,
  isProductPropertySchema,
  isProductSchema,
  isTaxonSchema,
  isVariantSchema
} from '@/features/product/utils';
import { reshapeProduct } from '@/features/product/utils/reshape';
import { isVendorSchema } from '@/features/vendor/utils';
import { revalidateTag } from 'next/cache';
import { TAGS as FAVORITE_PRODUCTS_TAGS } from '../constants';

export async function getFavorites(page?: number) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/account/favorites', {
    params: {
      query: {
        page,
        per_page: 12,
        include:
          'variant,variant.product,variant.product.images,variant.product.vendor,variant.product.product_properties,variant.product.vendor.banner_image'
      }
    },
    next: {
      tags: [FAVORITE_PRODUCTS_TAGS.favoriteProducts]
    }
  });

  if (error) {
    throw error;
  }

  const { data: favoriteData, meta } = data;

  const products = data.included?.filter((e) => isProductSchema(e)) as ProductSchema[];
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

  return {
    data: favoriteData
      .map((d) => {
        const product = products?.find((p) => {
          // バリエーションがある商品のときは、お気に入りに紐づくバリエーション商品を取得
          if (p.relationships.variants?.data?.length) {
            return p.relationships.variants?.data
              ?.map((v) => v?.id)
              .includes(d.relationships.variant?.data?.id);
          } else {
            // バリエーションがない商品のとき、デフォルトバリエーション商品を取得
            return p.relationships.default_variant?.data?.id === d.relationships.variant?.data?.id;
          }
        });

        if (!product) {
          return null;
        }

        return reshapeProduct({
          product: product as ProductSchema,
          productIncluded: productIncluded as ProductIncludes[]
        });
      })
      .filter(Boolean) as Product[],
    meta
  };
}

export async function addToFavorite(variantId: string) {
  try {
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
  } catch (e) {
    console.error(e);
  } finally {
    revalidateTag(FAVORITE_PRODUCTS_TAGS.favoriteProducts);
    revalidateTag(PRODUCT_TAGS.products);
  }
}

export async function removeFromFavorite(variantId: string) {
  try {
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
  } catch (e) {
    console.error(e);
  } finally {
    revalidateTag(FAVORITE_PRODUCTS_TAGS.favoriteProducts);
    revalidateTag(PRODUCT_TAGS.products);
  }
}
