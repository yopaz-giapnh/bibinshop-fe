import { LineItem } from '@/features/cart/types';
import { ImageSchema, ProductSchema, TaxonSchema, VariantSchema } from '@/features/product/types';
import { hasProperty } from '@/utils/type';

export function isImageSchema(includedObject: unknown): includedObject is ImageSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'image';
}

export function isProductSchema(includedObject: unknown): includedObject is ProductSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'product';
}

export function isTaxonSchema(includedObject: unknown): includedObject is TaxonSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'taxon';
}

export function isVariantSchema(includedObject: unknown): includedObject is VariantSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'variant';
}

export function findImageFromLineItem({
  lineItem,
  variants,
  images
}: {
  lineItem: LineItem;
  variants: VariantSchema[];
  images: ImageSchema[];
}) {
  const variant = variants.find((v) => v.id === lineItem.relationships.variant?.data?.id);
  const image = images.find((image) =>
    variant?.relationships.images?.data?.map((i) => i?.id).includes(image.id)
  );
  return image;
}

export function getProductImageUrl(image: ImageSchema | undefined) {
  if (!image) {
    return '/placeholder-product-image.png';
  }

  return `${image.attributes?.styles?.[image.attributes?.styles?.length - 1]?.url}`;
}
