import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { PriceSlider } from '@/components/ui/priceSlider';
import Pagination from '@/features/pagination/components/pagination';
import { getProducts } from '@/features/product/actions';
import { ProductGrid } from '@/features/product/components/product-grid';
import { getTaxons } from '@/features/taxon/actions';
import { Suspense } from 'react';
import { FilterForm } from './filterForm';

type Props = {
  vendorId: string;
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export async function VendorProducts({ vendorId, searchParams }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-col gap-6">
          <FilterForm getTaxons={getTaxons()} />
          <PriceSlider />
        </div>
        <div className="ml-14 mt-6">
          {/* TODO: api できてから */}
          {/* <div className="absolute right-0 mr-14">
            <SortButton />
          </div> */}
          <Suspense fallback={<LoadingSpinner />}>
            <ProductsList vendorId={vendorId} searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function ProductsList({ vendorId, searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const taxons = Array.isArray(searchParams?.taxons)
    ? searchParams?.taxons.join(',')
    : searchParams?.taxons;
  const prices = Array.isArray(searchParams?.prices)
    ? searchParams?.prices.join(',')
    : searchParams?.prices;

  const products = await getProducts({
    query: {
      'filter[vendor_ids]': vendorId,
      'filter[taxons]': taxons,
      'filter[price]': prices,
      page: currentPage
    }
  });
  const totalPages = products.meta.total_pages;

  return (
    <>
      <ProductGrid products={products.data} columns={4} className="mt-16 grid-cols-4" />
      {!!totalPages && <Pagination totalPages={totalPages} />}
    </>
  );
}
