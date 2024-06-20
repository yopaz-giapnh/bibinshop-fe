import { FacebookLogo } from '@/components/icons/facebook-logo';
import { InstagramLogo } from '@/components/icons/instagram-logo';
import { Logo } from '@/components/icons/logo';
import { XLogo } from '@/components/icons/x-logo';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';

export function Copyright() {
  const SocialLinks = ({ id }: { id: string }) => (
    <>
      {/* TODO: Facebookアカウント */}
      <Link
        href="https://www.instagram.com/bibinews_/"
        target="_blank"
        rel="noopener noreferrer"
        passHref
      >
        <FacebookLogo id={id} />
      </Link>
      {/* TODO: Xアカウント */}
      <Link
        href="https://www.instagram.com/bibinews_/"
        target="_blank"
        rel="noopener noreferrer"
        passHref
      >
        <XLogo id={id} />
      </Link>
      {/* TODO: Instagramアカウント */}
      <Link
        href="https://www.instagram.com/bibinews_/"
        target="_blank"
        rel="noopener noreferrer"
        passHref
      >
        <InstagramLogo id={id} />
      </Link>
    </>
  );

  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
      <div className="flex flex-col items-center justify-center md:flex  md:flex-row">
        <Logo />
        <div className="mt-[16px] flex gap-5 md:hidden">
          <SocialLinks id="sp" />
        </div>
        <Typography as="caption" element="p" className="mt-[16px] md:ml-4">
          Copyright ⓒ bibin co.,Ltd ALL RIGHTS RESERVED.
        </Typography>
      </div>
      <div className="hidden gap-5 md:flex">
        <SocialLinks id="pc" />
      </div>
    </div>
  );
}
