import { UserProfileSchema } from '@/features/account/profile/types';
import { SocialLinkSchema } from '@/features/account/profile/utils';
import { Product } from '@/features/product/types';
import { components } from '@/lib/api/storefront';

export type UserSchema = components['schemas']['User'] &
  components['schemas']['PublicUser'] & {
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
    received_feedback_reviews_count: number;
  };
  avatar: UserAvatarWithUrl | undefined;
  recommendedProducts?: Product[];
  socialLinks?: SocialLinkSchema[];
  userProfile?: UserProfileSchema;
};
