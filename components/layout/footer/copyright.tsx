import { FacebookLogo } from '@/components/icons/facebook-logo';
import { InstagramLogo } from '@/components/icons/instagram-logo';
import { Logo } from '@/components/icons/logo';
import { XLogo } from '@/components/icons/x-logo';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';

export function Copyright() {
  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <Logo />
        <Typography as="caption" element="p" className="ml-4">
          Copyright ⓒ bibin co.,Ltd ALL RIGHTS RESERVED.
        </Typography>
      </div>
      <div className="flex gap-5">
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
      </div>
    </div>
  );
}
