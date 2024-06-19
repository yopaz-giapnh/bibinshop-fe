import { hasProperty } from '@/utils/type';
import { ReviewSchema } from '../types';

export function isReviewSchema(includedObject: unknown): includedObject is ReviewSchema {
  return hasProperty(includedObject, 'type') && includedObject.type === 'review';
}
