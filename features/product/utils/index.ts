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
