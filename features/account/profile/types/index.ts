import { components } from '@/lib/api/storefront';
import { z } from 'zod';
import { SocialLinkSchema } from '../utils';

export type UserSchema = components['schemas']['User'] & components['schemas']['PublicUser'];

export type UserAvatarSchema = components['schemas']['UserAvatar'];
export type UserSocialLinkSchema = components['schemas']['UserSocialLink'];
export type UserProfileSchema = components['schemas']['UserProfile'];

export type UserAvatarWithUrl = UserAvatarSchema & {
  url: string;
};

export type User = UserSchema & {
  avatar: UserAvatarWithUrl | undefined;
  socialLinks?: SocialLinkSchema[];
};

export type UserSex = UserSchema['attributes']['sex'];

export const formSchema = z.object({
  nickname: z.string().min(1, '名前を入力してください').optional(),
  sex: z.enum(['male', 'female', 'not_applicable', 'not_known']).optional(),
  birthyear: z
    .string()
    .refine(
      (val) => !val || (/^\d{4}$/.test(val) && parseInt(val) >= 1900 && parseInt(val) < 2023),
      {
        message: '生まれた年は1900以上2023未満の4桁の数字で入力してください'
      }
    )
    .optional(),
  instagram: z.string().url('正しいURLを入力してください').optional().or(z.literal('')),
  x: z.string().url('正しいURLを入力してください').optional().or(z.literal('')),
  facebook: z.string().url('正しいURLを入力してください').optional().or(z.literal('')),
  skinType: z.string().optional(),
  personalColor: z.string().optional(),
  skinConcerns: z.array(z.string()).optional(),
  scalpConcerns: z.array(z.string()).optional(),
  healthConcerns: z.array(z.string()).optional()
});

export type FormValues = z.infer<typeof formSchema>;
