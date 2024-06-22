import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { getTaxons } from '@/features/taxon/actions';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const TaxonList = async () => {
  const categoriesList = await getTaxons();

  return (
    <ScrollArea className="whitespace-nowrap md:hidden">
      <div className="flex flex-col px-[8px] pt-[8px]">
        <ul className="flex w-full">
          {categoriesList.slice(0, Math.ceil(categoriesList.length / 2)).map((category) => (
            <ListItem
              key={category.id}
              title={category.attributes.name || ''}
              href={`/search?taxons=${category.id}`}
              // imageUrl={category.attributes.imageUrl || ''}
              imageUrl="/placeholder-product-image.png"
            />
          ))}
        </ul>
        <ul className="flex w-full">
          {categoriesList.slice(Math.ceil(categoriesList.length / 2)).map((category) => (
            <ListItem
              key={category.id}
              title={category.attributes.name || ''}
              href={`/search?taxons=${category.id}`}
              // imageUrl={category.attributes.imageUrl || ''} //TODO: 画像URLをtaxonsに追加しないといけない？
              imageUrl="/placeholder-product-image.png"
            />
          ))}
        </ul>
      </div>
      <ScrollBar orientation="horizontal" className="pt-[8px]" />
    </ScrollArea>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string; imageUrl: string }
>(({ className, title, imageUrl, ...props }, ref) => {
  return (
    <li className="flex flex-col items-center">
      <Link
        ref={ref}
        className={cn(
          'block w-[80px] select-none space-y-1 px-2 py-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className
        )}
        {...props}
      >
        {/* TODO: bg-redあとで消す */}
        <Image
          src={imageUrl}
          alt={title}
          className="h-16 w-16 rounded-full"
          width={30}
          height={30}
        />
        <Typography
          as="caption"
          element="p"
          className="overflow-hidden whitespace-normal break-words text-center text-[10px]"
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
