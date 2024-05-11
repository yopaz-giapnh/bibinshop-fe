import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';
import { ComponentProps } from 'react';
import { Product } from '../types';
import { ProductGrid } from './product-grid';
import { SeeMoreButton } from './see-more-button';

type Props = {
  title: string;
  seeMoreUrl: string;
  products: Product[];
} & Pick<ComponentProps<typeof ProductGrid>, 'columns'>;

export async function ProductOverview({ title, seeMoreUrl, products, columns }: Props) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Typography as="title" element="h1" className="text-center">
        {title}
      </Typography>
      <ProductGrid products={products} columns={columns} className="grid-cols-5" />
      <SeeMoreButton href={seeMoreUrl} />
    </div>
  );
}

export function ProductOverviewSkeleton() {
  return <Skeleton className="h-[469px] w-full" />;
}
