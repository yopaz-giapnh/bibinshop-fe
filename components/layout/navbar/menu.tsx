'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
import { getTaxons } from '@/features/taxon/actions';
import { cn } from '@/lib/utils';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { HandThumbUpIcon, MegaphoneIcon, StarIcon } from '@heroicons/react/24/solid';

type Props = {
  getTaxons: ReturnType<typeof getTaxons>;
};
export function Menu({ getTaxons }: Props) {
  const categoriesList = React.use(getTaxons);
  const pathname = usePathname();

  return (
    <div className="z-50 flex h-[44px] items-center bg-white-base md:h-[56px] md:bg-bibinBlue-100">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <div className="hidden bg-gradation md:block">
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
                  {categoriesList.map((category) => (
                    <ListItem
                      key={category.id}
                      title={category.attributes.name}
                      href={`/search?taxons=${category.id}`}
                    />
                  ))}
                </ul>
              </ScrollArea>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="md:hidden">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), {
                  'underline decoration-2 underline-offset-4': pathname === '/',
                  'md:no-underline': pathname === '/'
                })}
              >
                <Typography as="linkSmall" element="p" className="ml-0.5 text-black-90">
                  ホーム
                </Typography>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/products/bestseller?page=1" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), {
                  'underline decoration-2 underline-offset-4': pathname === '/products/bestseller',
                  'md:no-underline': pathname === '/products/bestseller'
                })}
              >
                <HandThumbUpIcon className="hidden h-5 w-5 text-white-base md:block" />
                <Typography
                  as="linkSmall"
                  element="p"
                  className="ml-0.5 text-black-90 md:text-white-base"
                >
                  ベストセラー
                </Typography>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/products/ranking?page=1" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), {
                  'underline decoration-2 underline-offset-4': pathname === '/products/ranking',
                  'md:no-underline': pathname === '/products/ranking'
                })}
              >
                <StarIcon className="hidden h-5 w-5 text-white-base md:block" />
                <Typography
                  as="linkSmall"
                  element="p"
                  className="ml-0.5 text-black-90 md:text-white-base"
                >
                  ランキング
                </Typography>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/products/new?page=1" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), {
                  'underline decoration-2 underline-offset-4': pathname === '/products/new',
                  'md:no-underline': pathname === '/products/new'
                })}
              >
                <MegaphoneIcon className="hidden h-5 w-5 text-white-base md:block" />
                <Typography
                  as="linkSmall"
                  element="p"
                  className="ml-0.5 text-black-90 md:text-white-base"
                >
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
