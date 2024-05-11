import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';
import { ComponentProps } from 'react';
import { ProductOverviewType } from '../types/product-overview';
import { getProducts, getSeeMoreUrl, getTitle } from '../utils/product-overview';
import { ProductGrid } from './product-grid';
import { SeeMoreButton } from './see-more-button';

type Props = {
  type: ProductOverviewType;
} & Pick<ComponentProps<typeof ProductGrid>, 'columns'>;

export async function ProductOverview({ type, columns }: Props) {
  const products = await getProducts();

  return (
    <div className="flex flex-col items-center gap-4">
      <Typography as="title" element="h1" className="text-center">
        {getTitle(type)}
      </Typography>
      <ProductGrid products={products} columns={columns} className="grid-cols-5" />
      <SeeMoreButton href={getSeeMoreUrl(type)} />
    </div>
  );
}

export function ProductOverviewSkeleton() {
  return <Skeleton className="h-[469px] w-full" />;
}
