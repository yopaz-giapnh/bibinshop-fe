import { SortButton } from '@/components/button/sort-button';
import { PriceSlider } from '@/components/ui/priceSlider';
import { getProducts } from '@/features/product/actions';
import { ProductGrid } from '@/features/product/components/product-grid';
import { Suspense } from 'react';
import { FilterForm } from './filterForm';

type Props = {
  vendorId: string;
};

export async function VendorProducts({ vendorId }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-col gap-6">
          <FilterForm />
          <PriceSlider />
        </div>
        <div className="ml-14 mt-6">
          <div className="absolute right-0 mr-14">
            <SortButton />
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <ProductsList vendorId={vendorId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function ProductsList({ vendorId }: Props) {
  const products = await getProducts({
    query: {
      'filter[vendor_ids]': vendorId
    }
  });

  return <ProductGrid products={products.data} columns={4} className="mt-16 grid-cols-4" />;
}
