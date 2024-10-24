import { ImageSchema, ProductIncludes, ProductSchema } from '@/features/product/types';
import { isVendorSchema } from '@/features/vendor/utils';
import {
  isImageSchema,
  isOptionTypeSchema,
  isOptionValueSchema,
  isProductPropertySchema,
  isTaxonSchema,
  isVariantSchema
} from '.';

export const reshapeProducts = ({
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

export const reshapeProduct = ({
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

const reshapeImages = (imageProductIncluded: ImageSchema[] | undefined) => {
  if (!imageProductIncluded) {
    return [];
  }

  return imageProductIncluded.map((image) => ({
    ...image,
    url: `${image.attributes.styles?.[image.attributes.styles.length - 1].url}`
  }));
};
