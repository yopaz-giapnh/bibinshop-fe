import { components } from '@/lib/api/storefront';
import { z } from 'zod';

export type UserSchema = components['schemas']['User'];

export type UserAvatarSchema = components['schemas']['UserAvatar'];

export type UserAvatarWithUrl = UserAvatarSchema & {
  url: string;
};

export type User = UserSchema & {
  avatar: UserAvatarWithUrl | undefined;
};

export type UserSex = UserSchema['attributes']['sex'];

export const formSchema = z.object({
  nickname: z.string()
});

export type FormValues = z.infer<typeof formSchema>;
