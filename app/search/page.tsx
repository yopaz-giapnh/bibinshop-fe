import { SortButton } from '@/components/button/sort-button';
import { FiltersDisplay } from '@/components/ui/mobile/filters-display';
import { PriceSlider } from '@/components/ui/priceSlider';
import { getProducts } from '@/features/product/actions';
import EmptyView from '@/features/product/components/empty-view';
import { ProductOverview } from '@/features/product/components/product-overview';
import { FilterFormSkeleton } from '@/features/product/components/skeletons/filter-form-skeleton';
import { ProductsListSkeleton } from '@/features/product/components/skeletons/products-list-skeleton';
import { getTaxons } from '@/features/taxon/actions';
import { FilterForm } from '@/features/vendor/components/filterForm';
import { Suspense } from 'react';

type Props = {
  searchParams?: { key?: string; taxons?: string[] | string; prices?: string; sort_by?: string };
};

export default async function Page({ searchParams }: Props) {
  return (
    <div className="mb-6 mt-2 h-full w-full bg-white-base md:px-16">
      <div className="pt-[64px] md:pt-[170px]">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-row gap-6 bg-[#F5F6FA] md:flex-col md:bg-inherit">
            <Suspense fallback={<FilterFormSkeleton />}>
              <FilterForm getTaxons={getTaxons()} />
            </Suspense>
            <PriceSlider />
            <div className="absolute right-0 mr-14 hidden md:block">
              <SortButton />
            </div>
          </div>
          <div className="relative mx-1 mt-2 flex-1 md:ml-14 md:mt-6">
            <Suspense fallback={<ProductsListSkeleton />}>
              <ProductOverviewWithPagination searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

async function ProductOverviewWithPagination({ searchParams }: Props) {
  const key = searchParams?.key;
  const taxons = Array.isArray(searchParams?.taxons)
    ? searchParams?.taxons.join(',')
    : searchParams?.taxons;
  const prices = searchParams?.prices;
  const sort_by = searchParams?.sort_by || '';

  const params = {
    query: {
      'filter[name]': key || '',
      'filter[taxons]': '',
      'filter[price]': prices || '',
      sort_by
    }
  };
  if (taxons && taxons.length > 0) {
    params.query['filter[taxons]'] = taxons;
  }
  const products = await getProducts(params);
  const totalPages = products.meta.total_pages;

  return (
    <div className="flex h-full flex-col">
      <FiltersDisplay taxons={taxons} prices={prices} getTaxons={getTaxons()} />
      {products.data.length ? (
        <div className="mt-6">
          <ProductOverview products={products.data} columns={4} totalPages={totalPages} />
        </div>
      ) : (
        <div className="mt-6 flex h-full w-full items-center justify-center">
          <EmptyView />
        </div>
      )}
    </div>
  );
}
