import { BrowseProducts } from '@/features/browse-products/components/browse-products';
import { BrowseProductsSkeleton } from '@/features/browse-products/components/skeletons/browse-products-skeleton';
import { Suspense } from 'react';

export default async function Page({ searchParams }: { searchParams?: { page?: string } }) {
  return (
    <Suspense fallback={<BrowseProductsSkeleton />}>
      <BrowseProducts searchParams={searchParams} />
    </Suspense>
  );
}
