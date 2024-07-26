'use client';

import { Typography } from '@/components/ui/typography';
import { ProductGrid } from '@/features/product/components/product-grid';
import { Product } from '@/features/product/types';
import { User } from '@/features/users/types';
import { useIsPc } from '@/hooks/use-is-pc';
import Image from 'next/image';
import Link from 'next/link';
import FollowUnfollowButton from './follow-unfollow-button';

type SnsUserListDetailCardProps = {
  user: User;
  products: Product[];
};

export async function SnsUserListDetailCard({ user, products }: SnsUserListDetailCardProps) {
  const isPc = useIsPc();
  const nickname = user.attributes.nickname || '名無し';
  const uniqueKey = user.attributes.unique_key;
  const avatarUrl = user.avatar?.url || '/placeholder-product-image.png';
  const isFollowing = user.attributes.followed_by_me;

  // TODO:demoデータ。あとで置き換える
  const tags = ['普通肌', '肌色: イエベ春タイプ', 'ニキビ', '毛穴'];

  const Tag = ({ text }: { text: string }) => (
    <Typography as="small" element="p" className="rounded-full bg-blue-200 px-2 py-1 text-sm">
      {text}
    </Typography>
  );

  return (
    <div className="bg-white-base p-4 shadow md:rounded-lg">
      <div className="mb-4 flex items-center">
        <Link href={`/user-detail/${uniqueKey}`}>
          <Image
            src={avatarUrl}
            alt={''}
            width={isPc ? 84 : 64}
            height={isPc ? 84 : 64}
            className="mr-4 h-[64px] w-[64px] rounded-full bg-gray-300 md:h-[84px] md:w-[84px]"
          />
        </Link>
        <div className="flex h-[64px] flex-col justify-center md:justify-between">
          <Typography as="boldSmall" element="h2" className="text-[16px] md:text-[20px]">
            {nickname}
          </Typography>
          <div className="mb-4 hidden space-x-2 pt-[8px] md:flex">
            {tags.map((tag, index) => (
              <Tag key={index} text={tag} />
            ))}
          </div>
        </div>
        <FollowUnfollowButton
          username={nickname}
          unique_key={uniqueKey}
          isFollowing={isFollowing}
        />
      </div>
      <div className="mb-4 flex space-x-2 md:hidden">
        {tags.map((tag, index) => (
          <Tag key={index} text={tag} />
        ))}
      </div>
      <Typography as="small" element="caption" className="mb-[8px] flex text-gray-500">
        好みの商品
      </Typography>
      <ProductGrid products={products} columns={4} />
    </div>
  );
}
