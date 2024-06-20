import { Logo } from '@/components/icons/logo';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { getAccount } from '@/features/account/profile/actions';
import Link from 'next/link';
import { ComponentProps, Suspense } from 'react';
import { AccountMenu } from './account-menu';
import { CartMenu } from './cart-menu';
import { Search } from './search';

type Props = Pick<ComponentProps<typeof AccountMenu>, 'isSignedIn'>;

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
        <AccountMenu isSignedIn={isSignedIn} getAccount={getAccount()} />
        <Suspense fallback={<LoadingSpinner />}>
          <CartMenu />
        </Suspense>
      </div>
    </div>
  );
}
