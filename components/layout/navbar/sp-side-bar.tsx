'use client';

import AppStoreDonwloadButton from '@/assets/app-store-download-button.svg';
import GooglePlayDonwloadButton from '@/assets/google-play-download-button.svg';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Typography } from '@/components/ui/typography';
import { getTaxonImageUrl } from '@/features/product/utils';
import { getTaxons } from '@/features/taxon/actions';
import { useWindowSize } from '@/hooks/use-window-size';
import { cn } from '@/lib/utils';
import { HandThumbUpIcon, MegaphoneIcon, StarIcon } from '@heroicons/react/24/solid';
import { AlignJustify, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  isSignedIn: boolean;
  getTaxons: ReturnType<typeof getTaxons>;
};

const CategoryLink = ({
  href,
  icon: Icon,
  label
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) => (
  <SheetClose asChild>
    <Link
      href={href}
      passHref
      className="flex w-[84px] flex-col items-center justify-center rounded-[6px] border-[1px] p-[8px]"
    >
      <Icon className="h-8 w-8" />
      <Typography as="linkSmall" element="p" className="ml-0.5 text-[10px] text-black-90">
        {label}
      </Typography>
    </Link>
  </SheetClose>
);

const DownloadButton = ({ children }: { children: React.ReactNode }) => (
  <SheetClose asChild>
    <button type="button">{children}</button>
  </SheetClose>
);

export function SpSideBar({ isSignedIn, getTaxons }: Props) {
  const categoriesList = React.use(getTaxons);
  const { height } = useWindowSize();

  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <AlignJustify className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent className="w-[300px]" side="left">
        <SheetHeader className="p-[16px]">
          <div className="flex items-center justify-between">
            <SheetTitle>カテゴリー</SheetTitle>
            <SheetClose asChild>
              <X className="h-6 w-6" />
            </SheetClose>
          </div>
        </SheetHeader>
        <div className="border-b-[1px]" />
        <div className="m-[16px] flex items-center justify-between">
          <CategoryLink
            href="/products/bestseller?page=1"
            icon={HandThumbUpIcon}
            label="ベストセラー"
          />
          <CategoryLink href="/products/ranking?page=1" icon={StarIcon} label="ランキング" />
          <CategoryLink href="/products/new?page=1" icon={MegaphoneIcon} label="新着" />
        </div>
        <ScrollArea>
          <ul
            style={{ maxHeight: isSignedIn ? height - 260 : height - 350 }}
            className="grid grid-cols-3 px-[8px]"
          >
            {categoriesList.map((category) => (
              <SheetClose asChild key={category.id}>
                <ListItem
                  title={category.attributes.name || ''}
                  href={`/search?taxons=${category.id}`}
                  imageUrl={getTaxonImageUrl(category.taxonImage)}
                />
              </SheetClose>
            ))}
          </ul>
        </ScrollArea>
        {!isSignedIn && (
          <div className="flex justify-around px-[8px] py-[24px]">
            <SheetClose asChild>
              <Link href="/signup" passHref>
                <Button type="button">bibin会員登録</Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/login"
                className="flex w-[130px] items-center justify-center rounded-[100px] border-[1px] border-bibinBlue-100 text-bibinBlue-100"
                passHref
              >
                <Typography as="boldSmall" element="p" className="text-center">
                  ログイン
                </Typography>
              </Link>
            </SheetClose>
          </div>
        )}
        {/* TODO: アプリができたら表示する。タイミングでコメントアウトする */}
        <div className="border-b-[1px]" />
        <div className="mt-[16px] flex flex-col justify-center px-[8px]">
          <Typography as="boldSmall" element="p" className="text-center">
            アプリをダウンロード
          </Typography>
          <div className="mt-[8px] flex justify-between">
            <DownloadButton>
              {/* TODO: app storeへの遷移 */}
              <AppStoreDonwloadButton />
            </DownloadButton>
            <DownloadButton>
              {/* TODO: google playへの遷移 */}
              <GooglePlayDonwloadButton />
            </DownloadButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string; imageUrl: string }
>(({ className, title, imageUrl, ...props }, ref) => {
  return (
    <li className="flex w-[80px] flex-col items-center">
      <Link
        ref={ref}
        className={cn(
          'block select-none space-y-1 px-2 py-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className
        )}
        {...props}
      >
        <Image
          src={imageUrl}
          alt={title}
          className="w-18 h-16 rounded-full"
          width={65}
          height={60}
        />
        <Typography
          as="caption"
          element="p"
          className="overflow-hidden whitespace-normal break-words text-center text-[12px]"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2
          }}
        >
          {title}
        </Typography>
      </Link>
    </li>
  );
});
ListItem.displayName = 'ListItem';
