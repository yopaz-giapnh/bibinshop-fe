'use client';

import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { startTransition, useCallback, useRef } from 'react';
import { FolloweesModal, FolloweesModalRef } from './followees-modal';
import { FollowersModal, FollowersModalRef } from './followers-modal';

type Props = {
  reviewsCount: number;
  followersCount: number;
  followeesCount: number;
  receivedFeedbackReviewsCount: number;
  uniqueKey: string;
  tags: string[];
  socialLinks?: {
    href: string | undefined;
    iconSrc: string | undefined;
    alt: string | undefined;
  }[];
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
  const router = useRouter();
  const followersModalRef = useRef<FollowersModalRef>(null);
  const followeesModalRef = useRef<FolloweesModalRef>(null);
  const refreshUserDetails = useCallback(() => {
    startTransition(() => {
      router.refresh();
    });
  }, [router]);

  const StatItem = ({
    value,
    label,
    onClick,
    isClickable = true
  }: {
    value: string;
    label: string;
    onClick?: () => void;
    isClickable?: boolean;
  }) => (
    <div
      className="flex flex-col items-center"
      onClick={isClickable ? onClick : undefined}
      style={{ cursor: isClickable && onClick ? 'pointer' : 'default' }}
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
    <Typography
      as="small"
      element="p"
      className="mr-2 mt-2 rounded-full bg-blue-200 px-2 py-1 text-sm"
    >
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
      <div className="mb-2 flex w-full items-center justify-center space-x-4">
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
          isClickable={followersCount > 0}
        />
        <div className="h-[40px] w-[0.5px] bg-gray-400" />
        <StatItem
          value={followeesCount?.toString() || '0'}
          label="フォロー中"
          onClick={() => {
            if (followeesCount === 0) return;
            followeesModalRef.current?.open();
          }}
          isClickable={followeesCount > 0}
        />
      </div>
      <div className="mx-[8px] mb-4 flex w-full max-w-screen-sm flex-wrap px-[16px] md:mx-0 md:px-0">
        {tags.map((tag, index) => (
          <Tag key={index} text={tag} />
        ))}
      </div>
      {socialLinks && (
        <div className="flex space-x-3">
          {socialLinks
            .filter((link) => link.href)
            .map((link, index) => (
              <SocialLink key={index} href={link.href || ''} alt="" iconSrc={link.iconSrc || ''} />
            ))}
        </div>
      )}
      <FollowersModal
        unique_key={uniqueKey}
        ref={followersModalRef}
        onClosed={refreshUserDetails}
      />
      <FolloweesModal
        unique_key={uniqueKey}
        ref={followeesModalRef}
        onClosed={refreshUserDetails}
      />
    </>
  );
};
