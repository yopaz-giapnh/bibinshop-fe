import { Menu } from '@/components/layout/navbar/menu';
import { getProductsOnTaxons, getTaxonId } from '@/features/product/actions';
import { ProductOverviewServer } from '@/features/product/components/product-overview-server';
import { ProductSkeleton } from '@/features/product/components/skeletons/product-skeleton';
import { getTaxons } from '@/features/taxon/actions';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page({ searchParams }: { searchParams?: { page?: string } }) {
  const bestSellerTaxonId = await getTaxonId('ベストセラー');
  const currentPage = searchParams?.page || '1';
  if (!bestSellerTaxonId) {
    return notFound();
  }

  const products = await getProductsOnTaxons([bestSellerTaxonId], currentPage);
  const totalPages = products.meta.total_pages;

  return (
    <div className="h-full w-full">
      <div className="mx-auto flex w-full flex-col pt-[73px] md:pt-[150px]">
        <div className="md:hidden">
          <Menu getTaxons={getTaxons()} />
        </div>
        <div className="flex flex-col items-center gap-6 px-[8px] py-6 md:px-[46.5px]">
          <Suspense fallback={<ProductSkeleton />}>
            <ProductOverviewServer
              title={'ベストセラー'}
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
