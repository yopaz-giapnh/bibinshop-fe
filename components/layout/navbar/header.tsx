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
    <div className="z-40 flex h-[72px] items-center justify-between border-b-[1px] bg-white-base px-[8px] py-3 md:px-[24px]">
      <div className="flex">
        <SpSideBar getTaxons={getTaxons} isSignedIn={isSignedIn} />
        <Link href="/" passHref>
          <Logo />
        </Link>
      </div>
      <div className="flex justify-center">
        <Search />
      </div>
      <div className="flex items-center justify-center gap-2">
        <AccountMenu isSignedIn={isSignedIn} getAccount={isSignedIn ? getAccount() : null} />
        <Suspense fallback={<LoadingSpinner />}>
          <CartMenu />
        </Suspense>
      </div>
    </div>
  );
}
