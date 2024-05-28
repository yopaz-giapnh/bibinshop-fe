import { SortButton } from '@/components/button/sort-button';
import { PriceSlider } from '@/components/ui/priceSlider';
import { ProductCard } from '@/features/product/components/product-card';
import { ProductGrid } from '@/features/product/components/product-grid';
import { ComponentProps } from 'react';
import { FilterForm } from './filterForm';

type Props = {
  products: ComponentProps<typeof ProductCard>['product'][];
};

export function VendorProducts({ products }: Props) {
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
          <ProductGrid products={products} columns={4} className="mt-16 grid-cols-4" />
        </div>
      </div>
    </div>
  );
}
