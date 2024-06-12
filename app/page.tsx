import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { CarouselBanner } from '@/features/banner/components/carousel-banner';
import { getProductsOnTaxons } from '@/features/product/actions';
import { ProductOverview } from '@/features/product/components/product-overview';
import { getRootTaxons } from '@/features/taxon/actions';
import { Suspense } from 'react';

export default async function Page() {
  const bestSellerTaxonId = await getTaxonsId('ベストセラー');
  const newTaxonId = await getTaxonsId('新着');
  const rankingTaxonId = await getTaxonsId('ランキング');

  return (
    <div className="h-full w-full">
      <div className="mx-auto flex w-full flex-col pt-[126px]">
        <CarouselBanner />

        <div className="flex w-full flex-col">
          <div className="flex flex-col items-center gap-6 px-[46.5px] py-6">
            <Suspense fallback={<LoadingSpinner />}>
              {bestSellerTaxonId &&
                renderProductOverview(
                  bestSellerTaxonId,
                  'ベストセラー',
                  '/products/bestseller?page=1'
                )}
            </Suspense>
            <Suspense fallback={<LoadingSpinner />}>
              {newTaxonId && renderProductOverview(newTaxonId, '新着', '/products/new?page=1')}
            </Suspense>
          </div>
          <div className="flex flex-col items-center bg-paleFrostBlue px-[46.5px] py-6">
            <Typography as="bold" element="h2" className="text-bibinBlue-100">
              \ 売れてる商品 /
            </Typography>
            <div className="mt-1">
              <Suspense fallback={<LoadingSpinner />}>
                {rankingTaxonId &&
                  renderProductOverview(rankingTaxonId, 'ランキング', '/products/ranking?page=1')}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const getTaxonsId = async (name: string) => {
  const taxons = await getRootTaxons(['name']);
  return taxons.find((taxon) => taxon.attributes.name === name)?.id;
};

const renderProductOverview = async (taxonId: string, title: string, seeMoreUrl: string) => {
  const products = await getProductsOnTaxons([taxonId]);

  return (
    <ProductOverview title={title} products={products.data} columns={5} seeMoreUrl={seeMoreUrl} />
  );
};

const renderProductOverviewWithPagination = async (
  taxonId: string,
  title: string,
  page: string
) => {
  const products = await getProductsOnTaxons([taxonId], page);
  const totalPages = products.meta.total_pages;

  return (
    <ProductOverview title={title} products={products.data} columns={5} totalPages={totalPages} />
  );
};

export { getTaxonsId, renderProductOverview, renderProductOverviewWithPagination };
