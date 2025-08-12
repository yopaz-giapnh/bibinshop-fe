'use client';

import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { Typography } from '@/components/ui/typography';
import { getAccount } from '@/features/account/profile/actions';
import { logout } from '@/features/auth/actions';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { NavigationMenuList } from '@radix-ui/react-navigation-menu';
import { UserRound } from 'lucide-react';
import Link from 'next/link';
import React, { FC, use } from 'react';
import { useFormStatus } from 'react-dom';

type Props = {
  isSignedIn: boolean;
  getAccount: ReturnType<typeof getAccount> | null;
};

export function AccountMenu({ isSignedIn, getAccount }: Props) {
  const { t } = useTranslation();
  const components: { key: string; href: string }[] = [
    { key: 'profile', href: '/account/profile' },
    { key: 'orders', href: '/account/order-history' },
    { key: 'messages', href: '/account/message' },
    { key: 'coupons', href: '/account/coupon' },
    { key: 'points', href: '/account/point-balance' },
    { key: 'history', href: '/account/browse-products' },
    { key: 'address', href: '/account/address' },
    { key: 'payment', href: '/account/payment' },
    { key: 'security', href: '/account/security' }
  ];
  const acc = getAccount ? use(getAccount) : null;

  return isSignedIn ? (
    <form action={logout}>
      <NavigationMenu viewPortClassName="rounded-md border-black-20">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-[-8px]">
              <AccountLink user={acc} />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="hidden md:block">
              <ul className="w-[201px] md:grid-cols-1">
                <UserName getAccount={getAccount} />
                <Separator />
                {components.map((component) =>
                  component.key === 'messages' && acc?.attributes.unread_notifications_count ? (
                    <ListItem
                      key={component.key}
                      title={t(`account.${component.key}`)}
                      href={component.href}
                    >
                      <div className="ml-2 inline-block h-2 w-2 rounded-full bg-red-500"></div>
                    </ListItem>
                  ) : (
                    <ListItem
                      key={component.key}
                      title={t(`account.${component.key}`)}
                      href={component.href}
                    />
                  )
                )}
                <Separator />

                <SignOut />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </form>
  ) : (
    <>
      <Link href="/signup" passHref className="mr-[20px] hidden md:block">
        <Button type="button">{t('account.create')}</Button>
      </Link>
      <Link href="/login" passHref className="flex">
        <UserRound className="h-6 w-6" />
        <Typography as="small" element="p" className="ml-1 hidden md:block">
          {t('account.login')}
        </Typography>
      </Link>
    </>
  );
}

const AccountLink: FC<{
  user: Awaited<ReturnType<typeof getAccount>> | null;
}> = ({ user }) => {
  const { pending } = useFormStatus();
  const { t } = useTranslation();

  return (
    <>
      <Link href={'/account/profile'} className="hidden md:flex" passHref>
        {pending ? (
          <LoadingSpinner />
        ) : (
          <>
            <UserRound className="h-6 w-6" />{' '}
            {(user?.attributes?.unread_notifications_count || null) && (
              <span
                style={{
                  position: 'relative',
                  width: '12px',
                  height: '12px',
                  borderRadius: '100%',
                  backgroundColor: 'white',
                  left: -12,
                  top: -4
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 2,
                    width: '10px',
                    height: '10px',
                    borderRadius: '100%',
                    backgroundColor: 'red'
                  }}
                />
              </span>
            )}
            <Typography as="small" element="p" className="ml-1">
              {t('account.manage')}
            </Typography>
          </>
        )}
      </Link>
      <Link href={'/account/sp-profile'} className="md:hidden" passHref>
        {pending ? <LoadingSpinner /> : <UserRound className="h-6 w-6" />}
      </Link>
    </>
  );
};

const UserName = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & { getAccount: ReturnType<typeof getAccount> | null }
>(({ className, getAccount, ...props }, ref) => {
  const account = getAccount ? use(getAccount) : null;
  const nickname = account ? account.attributes.nickname : '';

  return (
    !!nickname && (
      <li>
        <NavigationMenuLink asChild>
          <div
            ref={ref}
            className={cn(
              'bg-white block select-none space-y-1 px-4 pb-2 pt-3 leading-none no-underline outline-none transition-colors',
              className
            )}
            {...props}
          >
            <Typography as="linkXSmall" element="p" className="">
              {nickname}
            </Typography>
          </div>
        </NavigationMenuLink>
      </li>
    )
  );
});
UserName.displayName = 'UserName';

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'bg-white block select-none space-y-1 px-4 py-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          passHref
          {...props}
        >
          <Typography as="caption" element="p" className="text-black-50">
            {title}
            {props.children}
          </Typography>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

const SignOut = React.forwardRef<
  React.ElementRef<'button'>,
  React.ComponentPropsWithoutRef<'button'>
>(({ className, ...props }, ref) => {
  const { t } = useTranslation();
  return (
    <li>
      <NavigationMenuLink asChild>
        <button
          ref={ref}
          className={cn(
            'bg-white w-full select-none space-y-1 px-4 pb-3 pt-2 text-left leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <Typography as="caption" element="p" className="text-black-50">
            {t('account.signout')}
          </Typography>
        </button>
      </NavigationMenuLink>
    </li>
  );
});
SignOut.displayName = 'SignOut';

function Separator() {
  return <div className="mx-4 h-[1px] bg-black-10" />;
}
