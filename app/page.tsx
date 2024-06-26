import { Menu } from '@/components/layout/navbar/menu';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { CarouselBanner } from '@/features/banner/components/carousel-banner';
import { ProductOverviewByTaxon } from '@/features/product/components/product-overview-by-taxon';
import { getTaxons } from '@/features/taxon/actions';
import { TaxonList } from '@/features/taxon/components/taxon-list';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <div className="h-full w-full">
      <div className="mx-auto flex w-full flex-col pt-[73px] md:pt-[126px]">
        <div className="md:hidden">
          <Menu getTaxons={getTaxons()} />
        </div>
        <CarouselBanner />
        <Suspense fallback={<LoadingSpinner />}>
          <TaxonList />
        </Suspense>
        <div className="flex w-full flex-col">
          <div className="flex flex-col items-center gap-6 px-[8px] py-6 md:px-[46.5px]">
            <Suspense fallback={<LoadingSpinner />}>
              <ProductOverviewByTaxon
                title="ベストセラー"
                seeMoreUrl="/products/bestseller?page=1"
              />
            </Suspense>
            <Suspense fallback={<LoadingSpinner />}>
              <ProductOverviewByTaxon title="新着" seeMoreUrl="/products/new?page=1" />
            </Suspense>
          </div>
          <div className="flex flex-col items-center bg-paleFrostBlue px-[8px] py-6 md:px-[46.5px]">
            <Typography as="bold" element="h2" className="text-bibinBlue-100">
              \ 売れてる商品 /
            </Typography>
            <div className="mt-1 ">
              <Suspense fallback={<LoadingSpinner />}>
                <ProductOverviewByTaxon title="ランキング" seeMoreUrl="/products/ranking?page=1" />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
