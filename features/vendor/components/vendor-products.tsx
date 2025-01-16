import { PriceSlider } from '@/components/ui/priceSlider';
import { ProductsList } from '@/features/product/components/products-list';
import { ProductsListSkeleton } from '@/features/product/components/skeletons/products-list-skeleton';
import { getTaxons } from '@/features/taxon/actions';
import { Suspense } from 'react';
import { FilterForm } from './filterForm';

type Props = {
  vendorId: string;
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export function VendorProducts({ vendorId, searchParams }: Props) {
  return (
    <div className="flex flex-col">
      <div className="md:flex">
        <div className="hidden flex-col gap-6 md:flex">
          <FilterForm getTaxons={getTaxons()} />
          <PriceSlider />
        </div>
        {/* <div className="sticky top-[72px] mx-[-16px] flex justify-center bg-[#F5F6FA] p-2 md:hidden">
          <Button className="mx-1 w-3/5 border-2 border-bibinBlue-100 bg-white-base text-xs font-bold text-bibinBlue-100">
            <IconFunnel />
            絞り込み
          </Button>
          <Select>
            <SelectTrigger className="mx-1 w-3/5 rounded-full border-2 border-bibinBlue-100 bg-white-base text-xs font-bold text-bibinBlue-100">
              並べ替え: ランキング順
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
        <div className="w-full md:ml-14 md:mt-6">
          {/* <div className="absolute right-0 mr-14">
            <SortButton />
          </div> */}
          <Suspense fallback={<ProductsListSkeleton />}>
            <ProductsList vendorId={vendorId} searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
