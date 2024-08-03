import { components } from '@/lib/api/storefront';
import { hasProperty } from '@/utils/type';
import { colors, hairConcerns, healthConcerns, skinConcerns, skinTypes } from '../constants';

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

export function getConcernTags(userProfile: UserProfile['attributes']) {
  return [
    ...(userProfile?.skin_type
      ? [skinTypes.find((type) => type.value === userProfile.skin_type)?.text]
      : []),
    ...(userProfile?.personal_color
      ? [colors.find((color) => color.value === userProfile.personal_color)?.name]
      : []),
    ...(userProfile?.skin_concerns?.map(
      (concern) => skinConcerns.find((c) => c.value.includes(concern))?.text
    ) || []),
    ...(userProfile?.scalp_hair_concerns?.map(
      (concern) => hairConcerns.find((c) => c.value.includes(concern))?.text
    ) || []),
    ...(userProfile?.health_concerns?.map(
      (concern) => healthConcerns.find((c) => c.value.includes(concern))?.text
    ) || [])
  ].filter((tag): tag is string => !!tag);
}
