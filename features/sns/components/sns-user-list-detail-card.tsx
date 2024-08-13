import { Typography } from '@/components/ui/typography';
import { ProductGrid } from '@/features/product/components/product-grid';
import { Product } from '@/features/product/types';
import { User } from '@/features/users/types';
import Image from 'next/image';
import Link from 'next/link';
import { getConcernTags } from '../utils';
import FollowUnfollowButton from './follow-unfollow-button';

type SnsUserListDetailCardProps = {
  user: User;
  products: Product[];
};

export function SnsUserListDetailCard({ user, products }: SnsUserListDetailCardProps) {
  const nickname = user.attributes.nickname || '名無し';
  const uniqueKey = user.attributes.unique_key;
  const avatarUrl = user.avatar?.url || '/placeholder-product-image.png';
  const isFollowing = user.attributes.followed_by_me;
  const userProfileConcern = user.userProfile?.attributes;
  const tags = getConcernTags(userProfileConcern);

  const Tag = ({ text }: { text: string }) => (
    <Typography
      as="small"
      element="p"
      className="mr-2 mt-[4px] rounded-full bg-blue-200 px-2 py-1 text-sm"
    >
      {text}
    </Typography>
  );

  return (
    <div className="bg-white-base p-4 shadow md:rounded-lg">
      <div className="mb-4 flex items-center md:items-start">
        <Link
          href={`/user-detail/${uniqueKey}`}
          className="relative mr-4 h-16 w-16 flex-shrink-0 rounded-full md:h-[84px] md:w-[84px]"
        >
          <Image src={avatarUrl} alt={'avatar'} className="rounded-full" fill objectFit="cover" />
        </Link>
        <div className="flex flex-col justify-center md:justify-between">
          <Typography as="boldSmall" element="h2" className="pb-[4px] text-[16px] md:text-[20px]">
            {nickname}
          </Typography>
          <div className="hidden flex-wrap md:flex">
            {tags.map((tag, index) => (
              <Tag key={index} text={tag} />
            ))}
          </div>
        </div>
        <FollowUnfollowButton
          username={nickname}
          unique_key={uniqueKey}
          isFollowing={isFollowing || false}
        />
      </div>
      <div className="mb-4 flex flex-wrap md:hidden">
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
