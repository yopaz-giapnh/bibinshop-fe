import { ImageSchema, ProductSchema } from '@/features/product/types';
import { hasProperty } from '@/utils/type';

export function isImageSchema(includedObject: unknown): includedObject is ImageSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'image';
}

export function isProductSchema(includedObject: unknown): includedObject is ProductSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'product';
}
