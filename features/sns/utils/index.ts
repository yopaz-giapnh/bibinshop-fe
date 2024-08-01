import { components } from '@/lib/api/storefront';
import { hasProperty } from '@/utils/type';

export function isUserProfile(item: unknown): item is components['schemas']['UserProfile'] {
  return hasProperty(item, 'type') && item.type === 'user_profile';
}
type UserProfile = components['schemas']['UserProfile'];
type UserAttributes = UserProfile['attributes'] & Record<string, never>;
export type SkinType = UserAttributes['skin_type'];
export type PersonalColor = UserAttributes['personal_color'];
export type SkinConcern = NonNullable<UserAttributes['skin_concerns']>;
export type HairConcern = NonNullable<UserAttributes['scalp_hair_concerns']>;
export type HealthConcern = NonNullable<UserAttributes['health_concerns']>;
