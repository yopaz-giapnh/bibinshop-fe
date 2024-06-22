import { UserSchema } from '@/features/account/types';
import { ImageSchema, ProductSchema } from '@/features/product/types';
import { components, operations } from '@/lib/api/storefront';

export type ReviewListParameters = operations['review-list']['parameters'];

export type ReviewSchema = components['schemas']['Review'];

export type Review = ReviewSchema & {
  user: UserSchema | undefined;
  product: ProductSchema | undefined;
  images: ImageSchema[];
};
