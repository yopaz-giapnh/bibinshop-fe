'use client';

import { FacebookLogo } from '@/components/icons/facebook-logo';
import { InstagramLogo } from '@/components/icons/instagram-logo';
import { Logo } from '@/components/icons/logo';
import { XLogo } from '@/components/icons/x-logo';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';
import useMedia from 'use-media';

export function Copyright() {
  const isPc = useMedia({ minWidth: '768px' });

  const SocialLinks = () => (
    <>
      {/* TODO: Facebookアカウント */}
      <Link
        href="https://www.instagram.com/bibinews_/"
        target="_blank"
        rel="noopener noreferrer"
        passHref
      >
        <FacebookLogo />
      </Link>
      {/* TODO: Xアカウント */}
      <Link
        href="https://www.instagram.com/bibinews_/"
        target="_blank"
        rel="noopener noreferrer"
        passHref
      >
        <XLogo />
      </Link>
      {/* TODO: Instagramアカウント */}
      <Link
        href="https://www.instagram.com/bibinews_/"
        target="_blank"
        rel="noopener noreferrer"
        passHref
      >
        <InstagramLogo />
      </Link>
    </>
  );

  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
      <div className={`items-center ${isPc ? 'md:flex' : 'flex flex-col justify-center'}`}>
        <Logo />
        {isPc ? (
          <Typography as="caption" element="p" className="ml-4">
            Copyright ⓒ bibin co.,Ltd ALL RIGHTS RESERVED.
          </Typography>
        ) : (
          <>
            <div className="mt-[16px] flex gap-5">
              <SocialLinks />
            </div>
            <Typography as="caption" element="p" className="mt-[16px]">
              Copyright ⓒ bibin co.,Ltd ALL RIGHTS RESERVED.
            </Typography>
          </>
        )}
      </div>
      {isPc && (
        <div className="flex gap-5">
          <SocialLinks />
        </div>
      )}
    </div>
  );
}
