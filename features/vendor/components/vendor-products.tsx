import IconFunnel from '@/assets/funnel.svg';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { PriceSlider } from '@/components/ui/priceSlider';
import { Select, SelectContent, SelectTrigger } from '@/components/ui/select';
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
      <div className="md:flex">
        <div className="hidden flex-col gap-6 md:flex">
          <FilterForm getTaxons={getTaxons()} />
          <PriceSlider />
        </div>
        <div className="sticky top-[72px] mx-[-16px] flex justify-center bg-[#F5F6FA] p-2 md:hidden">
          <Button className="mx-1 w-3/5 border-2 border-bibinBlue-100 bg-white-base text-xs font-bold text-bibinBlue-100">
            <IconFunnel />
            絞り込み
          </Button>
          <Select>
            <SelectTrigger className="mx-1 w-3/5 rounded-full border-2 border-bibinBlue-100 bg-white-base text-xs font-bold text-bibinBlue-100">
              並べ替え: ランキング順
            </SelectTrigger>
            <SelectContent>
              {/* TODO: select values  */}
              {/* <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem> */}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:ml-14 md:mt-6">
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
      <ProductGrid products={products.data} columns={4} />
      {!!totalPages && <Pagination totalPages={totalPages} />}
    </>
  );
}
