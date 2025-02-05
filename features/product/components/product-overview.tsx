'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';
import Pagination from '@/features/pagination/components/pagination';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { Product } from '../types';
import { ProductGrid } from './product-grid';
import { SeeMoreButton } from './see-more-button';

type Props = {
  title?: string;
  products: Product[];
  seeMoreUrl?: string;
  totalPages?: number;
  isSignedIn: boolean;
} & Pick<ComponentProps<typeof ProductGrid>, 'columns'>;

export function ProductOverview({
  title,
  seeMoreUrl,
  products,
  columns,
  totalPages,
  isSignedIn
}: Props) {
  return (
    <div className="z-0 flex flex-col items-center gap-4">
      {title && (
        <Typography as="title" element="h1" className="text-center">
          {title}
        </Typography>
      )}
      <ProductGrid products={products} columns={columns} />
      {seeMoreUrl && <SeeMoreButton href={seeMoreUrl} arrow="right" />}
      {!!totalPages && <Pagination totalPages={totalPages} />}
      {!isSignedIn && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-between bg-black-30 p-[8px] md:hidden">
          <Typography as="small" element="p" className="ml-1 w-[190px] text-white-base">
            bibin会員はクーポン・ポイントで商品購入ができます
          </Typography>
          <Link href="/signup" passHref>
            <Button type="button">bibin会員登録</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export function ProductOverviewSkeleton() {
  return (
    <Skeleton className="h-[469px] w-full animate-[pulse_1s_ease-in-out_infinite] bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
  );
}
