import { Menu } from '@/components/layout/navbar/menu';
import { getProductsOnTaxons, getTaxonId } from '@/features/product/actions';
import { ProductOverview } from '@/features/product/components/product-overview';
import { ProductSkeleton } from '@/features/product/components/skeletons/product-skeleton';
import { getTaxons } from '@/features/taxon/actions';
import { Locale, translate } from '@/lib/i18n';
import { cookies } from 'next/headers';
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
  const locale = (cookies().get('NEXT_LOCALE')?.value || 'ja') as Locale;
  const t = (key: string) => translate(locale, key);

  return (
    <div className="h-full w-full">
      <div className="mx-auto flex w-full flex-col pt-[73px] md:pt-[150px]">
        <div className="md:hidden">
          <Menu getTaxons={getTaxons()} />
        </div>
        <div className="flex flex-col items-center gap-6 px-[8px] py-6 md:px-[46.5px]">
          <Suspense fallback={<ProductSkeleton />}>
            <ProductOverview
              title={t('nav.new')}
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
