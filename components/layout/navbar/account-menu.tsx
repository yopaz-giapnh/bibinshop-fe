'use client';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { Typography } from '@/components/ui/typography';
import { getAccount } from '@/features/account/profile/actions';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { useIsPc } from '@/hooks/use-is-pc';
import { cn } from '@/lib/utils';
import { NavigationMenuList } from '@radix-ui/react-navigation-menu';
import { UserRound } from 'lucide-react';
import Link from 'next/link';
import React, { use } from 'react';

type Props = {
  isSignedIn: boolean;
  getAccount: ReturnType<typeof getAccount> | null;
};

export function AccountMenu({ isSignedIn, getAccount }: Props) {
  const { signOut } = useAuth();
  const isPc = useIsPc();

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
    },
    {
      title: 'メッセージ',
      href: '/account/message'
    }
  ];

  return isSignedIn ? (
    <>
      <NavigationMenu viewPortClassName="rounded-md border-black-20">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="justify-start border-l border-r border-white-30 pl-[22px]">
              <Link
                href={isPc ? '/account/profile' : '/account/sp-profile'}
                className="flex"
                passHref
              >
                <UserRound className="h-6 w-6" />
                <Typography as="small" element="p" className="ml-1 hidden md:block">
                  アカウント管理
                </Typography>
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="hidden w-[201px] md:block md:grid-cols-1">
                <UserName getAccount={getAccount} />
                <Separator />
                {components.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href} />
                ))}
                <Separator />
                <SignOut onClick={signOut} />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  ) : (
    <>
      <Link href="/signup" passHref className="hidden md:block">
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
