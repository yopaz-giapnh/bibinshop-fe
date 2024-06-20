import { Logo } from '@/components/icons/logo';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { getAccount } from '@/features/account/profile/actions';
import { AlignJustify } from 'lucide-react';
import Link from 'next/link';
import { ComponentProps, Suspense } from 'react';
import { AccountMenu } from './account-menu';
import { CartMenu } from './cart-menu';
import { Search } from './search';

type Props = Pick<ComponentProps<typeof AccountMenu>, 'isSignedIn'>;

export function Header({ isSignedIn }: Props) {
  return (
    <div className="z-50 flex h-[72px] items-center justify-between bg-white-base px-[8px] py-3">
      {/* TODO: ハンバーガーメニュー開閉実装 */}
      <button className="flex items-center justify-center md:hidden">
        <AlignJustify className="h-6 w-6" />
      </button>
      <Link href="/" className="md:absolute md:left-[51px]" passHref>
        <Logo />
      </Link>
      <div className="flex justify-center md:flex-1">
        <Search />
      </div>
      <div className="right-6 flex items-center justify-center gap-4 md:absolute">
        <AccountMenu isSignedIn={isSignedIn} getAccount={getAccount()} />
        <Suspense fallback={<LoadingSpinner />}>
          <CartMenu />
        </Suspense>
      </div>
    </div>
  );
}
