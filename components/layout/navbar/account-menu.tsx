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
import { cn } from '@/lib/utils';
import { NavigationMenuList } from '@radix-ui/react-navigation-menu';
import { UserRound } from 'lucide-react';
import Link from 'next/link';
import React, { use } from 'react';
import { useFormStatus } from 'react-dom';

type Props = {
  isSignedIn: boolean;
  getAccount: ReturnType<typeof getAccount> | null;
};

export function AccountMenu({ isSignedIn, getAccount }: Props) {
  const components: { title: string; href: string }[] = [
    {
      title: 'プロフィール',
      href: '/account/profile'
    },
    {
      title: '注文履歴',
      href: '/account/order-history'
    },
    {
      title: 'メッセージ',
      href: '/account/message'
    },
    {
      title: 'クーポン',
      href: '/account/coupon'
    },
    {
      title: 'お届け先住所',
      href: '/account/address'
    },
    {
      title: 'お支払い方法',
      href: '/account/payment'
    },
    {
      title: 'アカウントセキュリティ',
      href: '/account/security'
    }
  ];

  return isSignedIn ? (
    <form action={logout}>
      <NavigationMenu viewPortClassName="rounded-md border-black-20">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-[-8px]">
              <AccountLink />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="hidden md:block">
              <ul className="w-[201px] md:grid-cols-1">
                <UserName getAccount={getAccount} />
                <Separator />
                {components.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href} />
                ))}
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
        <Button type="button">アカウント作成</Button>
      </Link>
      <Link href="/login" passHref className="flex">
        <UserRound className="h-6 w-6" />
        <Typography as="small" element="p" className="ml-1 hidden md:block">
          ログイン
        </Typography>
      </Link>
    </>
  );
}

const AccountLink = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <Link href={'/account/profile'} className="hidden md:flex" passHref>
        {pending ? (
          <LoadingSpinner />
        ) : (
          <>
            <UserRound className="h-6 w-6" />
            <Typography as="small" element="p" className="ml-1">
              アカウント管理
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
            サインアウト
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
