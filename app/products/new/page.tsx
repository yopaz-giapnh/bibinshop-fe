import { Menu } from '@/components/layout/navbar/menu';
import { getProductsOnTaxons, getTaxonId } from '@/features/product/actions';
import { ProductOverviewServer } from '@/features/product/components/product-overview-server';
import { ProductSkeleton } from '@/features/product/components/skeletons/product-skeleton';
import { getTaxons } from '@/features/taxon/actions';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page({ searchParams }: { searchParams?: { page?: string } }) {
  try {
    const newTaxonId = await getTaxonId('新着');
    const currentPage = searchParams?.page || '1';

    if (!newTaxonId) {
      console.error('タクソンIDが見つかりませんでした');
      return notFound();
    }

    // ページ番号のバリデーション
    const pageNum = parseInt(currentPage, 10);
    if (isNaN(pageNum) || pageNum < 1) {
      return notFound();
    }

    // APIリクエストにキャッシュを設定
    const products = await getProductsOnTaxons([newTaxonId], currentPage, 'newest-first', {
      next: { tags: ['new-products'], revalidate: 60 }
    });

    if (!products.data || products.data.length === 0) {
      if (pageNum > 1) {
        return notFound();
      }
    }

    return (
      <div className="h-full w-full">
        <div className="mx-auto flex w-full flex-col pt-[73px] md:pt-[150px]">
          <div className="md:hidden">
            <Menu getTaxons={getTaxons()} />
          </div>
          <div className="flex flex-col items-center gap-6 px-[8px] py-6 md:px-[46.5px]">
            <Suspense fallback={<ProductSkeleton />}>
              <ProductOverviewServer
                title={'新着'}
                products={products.data}
                columns={5}
                totalPages={products.meta.total_pages}
              />
            </Suspense>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ページレンダリング中にエラーが発生しました:', error);
    return notFound();
  }
}
