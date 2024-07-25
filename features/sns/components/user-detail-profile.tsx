'use client';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { User } from '@/features/users/types';
import { useIsPc } from '@/hooks/use-is-pc';
import Image from 'next/image';
import Link from 'next/link';

export default function UserDetailProfile({ userDetail }: { userDetail: User }) {
  const isPc = useIsPc();

  // TODO:demoデータ。あとで置き換える
  const tags = ['普通肌', '肌色: イエベ春タイプ', 'ニキビ', '毛穴'];

  // TODO:demoデータ。あとで置き換える
  const socialLinks = [
    {
      href: 'https://www.instagram.com/bibinews_/',
      iconSrc: '/instagram-icon.png',
      alt: 'Instagram'
    },
    { href: 'https://www.facebook.com/bibinews_/', iconSrc: '/facebook-icon.png', alt: 'Facebook' },
    { href: 'https://www.x.com/bibinews_/', iconSrc: '/x-icon.png', alt: 'X' }
  ];

  const StatItem = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center">
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

  const SocialLink = ({ href, iconSrc, alt }: { href: string; iconSrc: string; alt: string }) => (
    <Link href={href} target="_blank" rel="noopener noreferrer" passHref>
      <Image src={iconSrc} alt={alt} width={32} height={32} />
    </Link>
  );

  const UserStats = () => (
    <div className="mb-4 flex items-center space-x-4">
      <StatItem value="121" label="レビュー" />
      <div className="h-[40px] w-[0.5px] bg-gray-400" />
      <StatItem value="121" label="参考になった" />
      <div className="h-[40px] w-[0.5px] bg-gray-400" />
      <StatItem value="121" label="フォロワー" />
      <div className="h-[40px] w-[0.5px] bg-gray-400" />
      <StatItem value="121" label="フォロー中" />
    </div>
  );

  return (
    <div className="bg mt-[24px] w-full items-center justify-center md:flex">
      <div className="mb-[16px] ml-[8px] flex md:mb-0 md:ml-0">
        <Image
          src={userDetail.avatar?.url || '/placeholder-product-image.png'}
          alt=""
          width={isPc ? 160 : 88}
          height={isPc ? 160 : 88}
          className="rounded-full"
        />
        {!isPc && (
          <div className="item ml-4 flex flex-col items-baseline justify-end">
            <Typography as="boldSmall" element="h2" className="mb-[8px] mr-[16px] text-[20px]">
              {userDetail.attributes.nickname}
            </Typography>
            <Button className="text-white rounded-full px-4 py-1">
              <Typography as="boldSmall" element="p" className="text-[14px] text-white-base">
                フォローする
              </Typography>
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center md:ml-6 md:items-start">
        {isPc && (
          <div className="mb-4 flex items-center">
            <Typography as="boldSmall" element="h2" className="mr-[16px] text-[20px]">
              {userDetail.attributes.nickname}
            </Typography>
            <Button className="text-white rounded-full px-4 py-1">
              <Typography as="boldSmall" element="p" className="text-white-base">
                フォローする
              </Typography>
            </Button>
          </div>
        )}
        <UserStats />
        <div className="mb-4 flex space-x-2">
          {tags.map((tag, index) => (
            <Tag key={index} text={tag} />
          ))}
        </div>
        <div className="flex space-x-3">
          {socialLinks.map((link, index) => (
            <SocialLink key={index} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
}
