import { LineItem } from '@/features/cart/types';
import {
  CalculatorSchema,
  CancellationRequestSchema,
  ImageSchema,
  OptionTypeSchema,
  OptionValueSchema,
  ProductPropertySchema,
  ProductSchema,
  ShippingMethod,
  TaxonSchema,
  VariantSchema
} from '@/features/product/types';
import { TaxonImageSchema } from '@/features/taxon/types';
import { VendorSchema } from '@/features/vendor/types';
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

export function isTaxonImageSchema(includedObject: unknown): includedObject is TaxonImageSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'taxon_image';
}

export function isVariantSchema(includedObject: unknown): includedObject is VariantSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'variant';
}

export function isOptionTypeSchema(includedObject: unknown): includedObject is OptionTypeSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'option_type';
}

export function isOptionValueSchema(includedObject: unknown): includedObject is OptionValueSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'option_value';
}

export function isCancellationReuqestSchema(
  includedObject: unknown
): includedObject is CancellationRequestSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'cancellation_request';
}

export function isProductPropertySchema(
  includedObject: unknown
): includedObject is ProductPropertySchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'product_property';
}

export function isCalculatorSchema(includedObject: unknown): includedObject is CalculatorSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'calculator';
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

export function getDisplayShippingCost({
  shippingMethods,
  vendor
}: {
  shippingMethods: ShippingMethod[];
  vendor: VendorSchema;
}) {
  const shippingMethod = shippingMethods.find(
    (shippingMethod) => shippingMethod.relationships.vendor?.data?.id === vendor?.id
  );

  const cost = shippingMethod?.calculator?.attributes.preferences?.amount;
  if (!cost) {
    return null;
  }

  return parseInt(cost).toLocaleString() + '円';
}

export function getTaxonImageUrl(image: TaxonImageSchema | undefined) {
  if (!image) {
    return '/placeholder-product-image.png';
  }

  return `${image.attributes?.styles?.[image.attributes?.styles?.length - 1]?.url}`;
}
