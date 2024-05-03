import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { ShoppingCart, UserRound } from 'lucide-react';
import Link from 'next/link';
import { Search } from './search';

export function Header() {
  return (
    <div className="flex h-[72px] items-center bg-white-base py-3">
      <Link href="/" className="absolute left-[51px]">
        <Logo />
      </Link>
      <div className="flex flex-1 justify-center">
        <Search />
      </div>
      <div className="absolute right-6 flex items-center justify-center gap-4">
        <Button type="button">アカウント作成</Button>
        <Link href="/login">
          <div className="flex">
            <UserRound className="h-6 w-6" />
            <Typography as="small" element="p" className="ml-1">
              ログイン
            </Typography>
          </div>
        </Link>
        <Link href="/cart">
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
