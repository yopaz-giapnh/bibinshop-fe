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
  nickname: z.string(),
  sex: z.custom<UserSex>(),
  birthyear: z.number().int().optional(),
  instagram: z
    .string()
    .url()
    .startsWith('https://www.instagram.com/', 'リンクがインスタグラムではありません')
    .optional(),
  x: z.string().url().startsWith('https://www.x.com/', 'リンクはXではありません').optional(),
  tiktok: z
    .string()
    .url()
    .startsWith('https://www.tiktok.com/', 'リンクはTikTokではありません')
    .optional(),
  skinType: z.string().optional(),
  personalColor: z.string().optional(),
  skinConcerns: z.array(z.string()).optional(),
  scalpConcerns: z.array(z.string()).optional(),
  healthConcerns: z.array(z.string()).optional()
});

export type FormValues = z.infer<typeof formSchema>;
