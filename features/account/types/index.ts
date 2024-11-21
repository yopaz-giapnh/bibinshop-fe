import { components } from '@/lib/api/storefront';

export type UserSchema = components['schemas']['User'] & {
  attributes: {
    unique_key: string;
  } & components['schemas']['User']['attributes'];
};
