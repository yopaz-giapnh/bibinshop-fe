import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { PriceSlider } from '@/components/ui/priceSlider';
import { getProducts } from '@/features/product/actions';
import EmptyView from '@/features/product/components/empty-view';
import { ProductOverview } from '@/features/product/components/product-overview';
import { getTaxons } from '@/features/taxon/actions';
import { FilterForm } from '@/features/vendor/components/filterForm';
import { Suspense } from 'react';

export default async function Page({
  searchParams
}: {
  searchParams?: { key?: string; taxons?: string[] | string; prices?: string };
}) {
  return (
    <div className="mb-6 mt-2 h-full w-full bg-white-base px-16">
      <div className="pt-[128px]">
        <div className="flex">
          <div className="flex flex-col gap-6">
            <Suspense fallback={<LoadingSpinner />}>
              <FilterForm getTaxons={getTaxons()} />
            </Suspense>
            <PriceSlider />
          </div>
          <div className="relative ml-14 mt-6 flex-1">
            {/* TODO: api が実装されてから表示 */}
            {/* <div className="absolute right-0 mr-14">
              <SortButton />
            </div> */}
            <Suspense fallback={<LoadingSpinner />}>
              {searchParams?.key &&
                renderProductOverviewWithPagination(
                  searchParams?.key,
                  Array.isArray(searchParams?.taxons)
                    ? searchParams?.taxons.join(',')
                    : searchParams?.taxons,
                  searchParams?.prices
                )}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

const renderProductOverviewWithPagination = async (
  key: string,
  taxons?: string,
  prices?: string
) => {
  const params = {
    query: {
      'filter[name]': key,
      'filter[taxons]': '',
      'filter[price]': prices || ''
    }
  };
  if (taxons && taxons.length > 0) {
    params.query['filter[taxons]'] = taxons;
  }
  const products = await getProducts(params);
  const totalPages = products.meta.total_pages;

  return products.data.length === 0 ? (
    <div className="mt-6 flex h-full items-center justify-center">
      <div className="flex h-full w-full items-center justify-center">
        <EmptyView />
      </div>
    </div>
  ) : (
    <div className="mt-6 flex h-full">
      <ProductOverview products={products.data} columns={4} totalPages={totalPages} />
    </div>
  );
};
