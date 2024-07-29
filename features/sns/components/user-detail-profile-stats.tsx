'use client';

import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { FolloweesModal, FolloweesModalRef } from './followees-modal';
import { FollowersModal, FollowersModalRef } from './followers-modal';

type Props = {
  reviewsCount: number;
  followersCount: number;
  followeesCount: number;
  receivedFeedbackReviewsCount: number;
  uniqueKey: string;
  tags: string[];
  socialLinks: Array<{ href: string; iconSrc: string; alt: string }>;
};

export const UserDetailProfileStats = ({
  reviewsCount,
  followersCount,
  followeesCount,
  receivedFeedbackReviewsCount,
  tags,
  socialLinks,
  uniqueKey
}: Props) => {
  const followersModalRef = useRef<FollowersModalRef>(null);
  const followeesModalRef = useRef<FolloweesModalRef>(null);

  const StatItem = ({
    value,
    label,
    onClick
  }: {
    value: string;
    label: string;
    onClick?: () => void;
  }) => (
    <div
      className="flex flex-col items-center"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <Typography as="boldSmall" element="p" className="text-[16px] md:text-sm">
        {value}
      </Typography>
      <Typography as="caption" element="p" className="text-[12px] md:text-sm">
        {label}
      </Typography>
    </div>
  );

  const Tag = ({ text }: { text: string }) => (
    <Typography as="small" element="p" className="rounded-full bg-blue-200 px-2 py-1 text-sm">
      {text}
    </Typography>
  );

  const SocialLink = ({ href, iconSrc, alt }: { href: string; iconSrc: string; alt: string }) => {
    if (!href) return null;

    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" passHref>
        <Image src={iconSrc} alt={alt} width={32} height={32} />
      </Link>
    );
  };

  return (
    <>
      <div className="mb-4 flex items-center space-x-4">
        <StatItem value={reviewsCount?.toString() || '0'} label="レビュー" />
        <div className="h-[40px] w-[0.5px] bg-gray-400" />
        <StatItem value={receivedFeedbackReviewsCount?.toString() || '0'} label="参考になった" />
        <div className="h-[40px] w-[0.5px] bg-gray-400" />
        <StatItem
          value={followersCount?.toString() || '0'}
          label="フォロワー"
          onClick={() => {
            if (followersCount === 0) return;
            followersModalRef.current?.open();
          }}
        />
        <div className="h-[40px] w-[0.5px] bg-gray-400" />
        <StatItem
          value={followeesCount?.toString() || '0'}
          label="フォロー中"
          onClick={() => {
            if (followeesCount === 0) return;
            followeesModalRef.current?.open();
          }}
        />
      </div>
      <div className="mb-4 flex space-x-2">
        {tags.map((tag, index) => (
          <Tag key={index} text={tag} />
        ))}
      </div>
      <div className="flex space-x-3">
        {socialLinks
          .filter((link) => link.href)
          .map((link, index) => (
            <SocialLink key={index} {...link} />
          ))}
      </div>
      <FollowersModal unique_key={uniqueKey} ref={followersModalRef} />
      <FolloweesModal unique_key={uniqueKey} ref={followeesModalRef} />
    </>
  );
};
