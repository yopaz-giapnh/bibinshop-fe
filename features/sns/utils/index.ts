import { components } from '@/lib/api/storefront';
import { hasProperty } from '@/utils/type';

export function isUserProfile(item: unknown): item is components['schemas']['UserProfile'] {
  return hasProperty(item, 'type') && item.type === 'user_profile';
}
type UserProfile = components['schemas']['UserProfile'];
type UserAttributes = UserProfile['attributes'];
type ForcedAttributes = UserAttributes & {};
export type SkinType = ForcedAttributes['skin_type'];
export type PersonalColor = ForcedAttributes['personal_color'];
export type SkinConcern = NonNullable<ForcedAttributes['skin_concerns']>;
export type HairConcern = NonNullable<ForcedAttributes['scalp_hair_concerns']>;
export type HealthConcern = NonNullable<ForcedAttributes['health_concerns']>;
