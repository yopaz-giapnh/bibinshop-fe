import { Menu } from '@/components/layout/navbar/menu';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { getProductsOnTaxons, getTaxonId } from '@/features/product/actions';
import { ProductOverview } from '@/features/product/components/product-overview';
import { getTaxons } from '@/features/taxon/actions';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page({ searchParams }: { searchParams?: { page?: string } }) {
  const newTaxonId = await getTaxonId('新着');
  const currentPage = searchParams?.page || '1';
  if (!newTaxonId) {
    return notFound();
  }

  const products = await getProductsOnTaxons([newTaxonId], currentPage, 'newest-first');
  const totalPages = products.meta.total_pages;

  return (
    <div className="h-full w-full">
      <div className="mx-auto flex w-full flex-col pt-[73px] md:pt-[150px]">
        <div className="md:hidden">
          <Menu getTaxons={getTaxons()} />
        </div>
        <div className="flex flex-col items-center gap-6 px-[8px] py-6 md:px-[46.5px]">
          {/* TODO: スケルトンビュー */}
          <Suspense fallback={<LoadingSpinner />}>
            <ProductOverview
              title={'新着'}
              products={products.data}
              columns={5}
              totalPages={totalPages}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
