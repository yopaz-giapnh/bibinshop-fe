import { UserSchema } from '@/features/account/types';
import { ImageSchema, ProductSchema } from '@/features/product/types';
import { UserAvatarSchema } from '@/features/users/types';
import { components, operations } from '@/lib/api/storefront';
export type ReviewListParameters = operations['review-list']['parameters'];

export type ReviewSchema = components['schemas']['Review'];

export type UserWithAvatar = UserSchema & {
  avatar?: {
    url: string;
  };
};

export type Review = ReviewSchema & {
  user: UserWithAvatar | undefined;
  product: ProductSchema | undefined;
  images: ImageSchema[];
  avatar: UserAvatarSchema | undefined;
};

export type ReviewCommentSchema = components['schemas']['ReviewComment'];

export type ReviewCommentWithUser = ReviewCommentSchema & {
  user: UserWithAvatar | undefined;
};

export type ReviewCommentsListSchema = components['schemas']['ReviewCommentsList'];
