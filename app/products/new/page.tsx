import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { getProductsOnTaxons, getTaxonId } from '@/features/product/actions';
import { ProductOverview } from '@/features/product/components/product-overview';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page({ searchParams }: { searchParams?: { page?: string } }) {
  const newTaxonId = await getTaxonId('新着');
  const currentPage = searchParams?.page || '1';
  if (!newTaxonId) {
    return notFound();
  }

  const products = await getProductsOnTaxons([newTaxonId], currentPage);
  const totalPages = products.meta.total_pages;

  return (
    <div className="h-full w-full">
      <div className="mx-auto flex w-full flex-col pt-[126px]">
        <div className="flex flex-col items-center gap-6 px-[8px] py-6 md:px-[46.5px]">
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
