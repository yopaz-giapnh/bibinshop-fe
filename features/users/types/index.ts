import { Product } from '@/features/product/types';
import { components } from '@/lib/api/storefront';

export type UserSchema = components['schemas']['User'] & {
  relationships: components['schemas']['User']['relationships'] & {
    recommended_products?: {
      data?: { id: string; type: string }[];
    };
  };
};

export type UserAvatarSchema = components['schemas']['UserAvatar'];

export type UserAvatarWithUrl = UserAvatarSchema & {
  url: string;
};

export type User = Omit<UserSchema, 'relationships' | 'attributes'> & {
  relationships: UserSchema['relationships'] & {
    reviews?: {
      data?: { id: string; type: string }[];
    };
  };
  attributes: UserSchema['attributes'] & {
    unique_key: string;
  };
  avatar: UserAvatarWithUrl | undefined;
  recommendedProducts?: Product[];
};
