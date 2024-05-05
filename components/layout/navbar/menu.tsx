'use client';

import Link from 'next/link';
import * as React from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { HandThumbUpIcon, StarIcon } from '@heroicons/react/24/solid';

const components: { title: string; href: string }[] = [
  {
    title: 'スキンケア',
    href: '/'
  },
  {
    title: 'ベースメイク',
    href: '/'
  },
  {
    title: 'ポイントメイク',
    href: '/'
  },
  {
    title: 'メイク小物',
    href: '/'
  },
  {
    title: 'UVケア',
    href: '/'
  },
  {
    title: 'ボディ・ハンド・フットケア',
    href: '/'
  },
  {
    title: '脱毛・除毛',
    href: '/'
  },
  {
    title: 'ヘア',
    href: '/'
  },
  {
    title: 'ネイル',
    href: '/'
  },
  {
    title: '香水',
    href: '/'
  }
];

export function Menu() {
  return (
    <div className="flex h-[56px] items-center bg-bibinBlue-100 px-[142px]">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <div className="bg-gradation">
              <NavigationMenuTrigger className="h-[56px] w-[268px] justify-start border-l border-r border-white-30 pl-[22px]">
                <Bars3Icon className="h-6 w-6 text-white-base" />
                <Typography as="linkBase" element="p" className="ml-1">
                  カテゴリー
                </Typography>
              </NavigationMenuTrigger>
            </div>
            <NavigationMenuContent>
              <ScrollArea>
                <ul className="grid max-h-[370px] w-[270px] md:grid-cols-1">
                  {components.map((component) => (
                    <ListItem key={component.title} title={component.title} href={component.href} />
                  ))}
                </ul>
              </ScrollArea>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <HandThumbUpIcon className="h-5 w-5 text-white-base" />
                <Typography as="linkSmall" element="p" className="ml-0.5">
                  ベストセラー
                </Typography>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <StarIcon className="h-5 w-5 text-white-base" />
                <Typography as="linkSmall" element="p" className="ml-0.5">
                  ランキング
                </Typography>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Typography as="linkSmall" element="p">
                  新着
                </Typography>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

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
            'bg-white block select-none space-y-1 border-b border-black-10 px-5 py-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <Typography as="small" element="p">
            {title}
          </Typography>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
