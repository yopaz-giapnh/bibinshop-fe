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
import { useAuth } from '@/features/auth/hooks/use-auth';
import { cn } from '@/lib/utils';
import { NavigationMenuList } from '@radix-ui/react-navigation-menu';
import { UserRound } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {
  isSignedIn: boolean;
};

const components: { title: string; href: string }[] = [
  {
    title: 'プロフィール',
    href: '/'
  },
  {
    title: '注文履歴',
    href: '/'
  },
  {
    title: 'メッセージ',
    href: '/'
  }
];

export function AccountMenu({ isSignedIn }: Props) {
  const { signOut } = useAuth();

  return isSignedIn ? (
    <>
      <NavigationMenu viewPortClassName="rounded-md border-black-20">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="justify-start border-l border-r border-white-30 pl-[22px]">
              <div className="flex">
                <UserRound className="h-6 w-6" />
                <Typography as="small" element="p" className="ml-1">
                  アカウント管理
                </Typography>
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[201px] md:grid-cols-1">
                <UserName title="yamada_taro136" />
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
      <Link href="/signup" passHref>
        <Button type="button">アカウント作成</Button>
      </Link>
      <Link href="/login" passHref>
        <div className="flex">
          <UserRound className="h-6 w-6" />
          <Typography as="small" element="p" className="ml-1">
            ログイン
          </Typography>
        </div>
      </Link>
    </>
  );
}

const UserName = React.forwardRef<React.ElementRef<'div'>, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, title, ...props }, ref) => {
    return (
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
              {title}
            </Typography>
          </div>
        </NavigationMenuLink>
      </li>
    );
  }
);
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
