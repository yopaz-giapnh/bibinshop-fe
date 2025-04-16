import { Logo } from '@/components/icons/logo';
import { CartMenuSkeleton } from '@/components/layout/navbar/skeletons/cart-menu-skeleton';
import { Typography } from '@/components/ui/typography';
import { getAccount } from '@/features/account/profile/actions';
// import NewRegistrationCouponBanner from '@/features/coupon/components/new-registration-coupoun-banner';
import { getTaxons } from '@/features/taxon/actions';
import { Heart } from 'lucide-react';
import Image from 'next/image';
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
    <div>
      {/*TODO: 初回登録クーポン関連の表示をリリース時には表示させないようにする*/}
      {/*{!isSignedIn && <NewRegistrationCouponBanner />}*/}
      <div className="z-40 flex h-[72px] items-center justify-between border-b-[1px] bg-white-base px-[8px] py-3 md:px-[24px]">
        <div className="flex">
          <SpSideBar getTaxons={getTaxons} isSignedIn={isSignedIn} />
          <Link href="/" passHref>
            <Logo />
          </Link>
        </div>
        <div className="flex justify-center">
          <Search isSignedIn={isSignedIn} />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Link href="/sns" passHref className="mr-[6px] hidden md:block">
            <Image
              src={'/bibin-sns-header-icon.png'}
              alt={'sms header logo'}
              width={120}
              height={25}
              style={{
                width: 'auto',
                height: '25px',
                maxWidth: '120px'
              }}
            />
          </Link>
          <div className="mr-[6px] hidden h-[40px] w-[1px] bg-gray-200 md:block" />
          <AccountMenu isSignedIn={isSignedIn} getAccount={isSignedIn ? getAccount() : null} />
          <Link href="/favorite-products" className="flex md:ml-6">
            <Heart className="h-6 w-6" />
            <Typography as="small" element="p" className="ml-1 hidden md:block">
              お気に入り
            </Typography>
          </Link>
          <Suspense fallback={<CartMenuSkeleton />}>
            <CartMenu />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
