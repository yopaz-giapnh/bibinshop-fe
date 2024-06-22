import { Logo } from '@/components/icons/logo';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { getAccount } from '@/features/account/profile/actions';
import { getTaxons } from '@/features/taxon/actions';
import Link from 'next/link';
import { ComponentProps, Suspense } from 'react';
import { AccountMenu } from './account-menu';
import { CartMenu } from './cart-menu';
import { Search } from './search';
import { SpSideBar } from './sp-side-bar';

type Props = Pick<ComponentProps<typeof AccountMenu>, 'isSignedIn'> & {
  getTaxons: ReturnType<typeof getTaxons>;
};

export function Header({ isSignedIn, getTaxons }: Props) {
  return (
    <div className="z-50 flex h-[72px] items-center justify-between bg-white-base px-[8px] py-3">
      <SpSideBar getTaxons={getTaxons} isSignedIn={isSignedIn} />
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
