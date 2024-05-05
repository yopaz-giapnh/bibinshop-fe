'use client';

import { Logo } from '@/components/icons/logo';
import { Typography } from '@/components/ui/typography';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { AccountMenu } from './account-menu';
import { Search } from './search';

type Props = ComponentProps<typeof AccountMenu>;

export function Header({ isSignedIn }: Props) {
  return (
    <div className="flex h-[72px] items-center bg-white-base py-3">
      <Link href="/" className="absolute left-[51px]" passHref>
        <Logo />
      </Link>
      <div className="flex flex-1 justify-center">
        <Search />
      </div>
      <div className="absolute right-6 flex items-center justify-center gap-4">
        <AccountMenu isSignedIn={isSignedIn} />
        <Link href="/cart" passHref>
          <div className="flex">
            <ShoppingCart className="h-6 w-6" />
            <Typography as="small" element="p" className="ml-1">
              カート
            </Typography>
          </div>
        </Link>
      </div>
    </div>
  );
}
