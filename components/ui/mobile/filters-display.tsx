'use client';

import FilterX from '@/assets/mobile/filter-x.svg';
import TrashIcon from '@/assets/trash.svg';
import { getTaxons } from '@/features/taxon/actions';
import { useRouter } from 'next/navigation';
import { use } from 'react';

type Props = {
  taxons?: string;
  prices?: string;
  getTaxons: ReturnType<typeof getTaxons>;
};

export function FiltersDisplay({ taxons, prices, getTaxons }: Props) {
  const router = useRouter();
  const categoriesList = use(getTaxons);
  const selectedCategories =
    taxons?.split(',')?.map((id) => categoriesList.find((cat) => cat.id == id)) ?? [];
  const price = prices?.split(',')?.map((n) => Number.parseInt(n));

  const clearPrice = () => {
    const currentUrl = new URL(window.location.href);
    const currentParams = new URLSearchParams(currentUrl.search);
    currentParams.delete('prices');
    const newUrl = `${currentUrl.pathname}?${currentParams.toString()}`;
    router.push(newUrl);
  };

  const removeTaxon = (id: string) => {
    const currentUrl = new URL(window.location.href);
    const currentParams = new URLSearchParams(currentUrl.search);
    currentParams.delete('taxons');
    selectedCategories
      .filter((c) => c && c.id != id)
      .forEach((cat) => currentParams.append('taxons', cat?.id ?? ''));
    const newUrl = `${currentUrl.pathname}?${currentParams.toString()}`;
    router.push(newUrl);
  };

  const clearAll = () => {
    const currentUrl = new URL(window.location.href);
    const currentParams = new URLSearchParams(currentUrl.search);
    currentParams.delete('prices');
    currentParams.delete('taxons');
    const newUrl = `${currentUrl.pathname}?${currentParams.toString()}`;
    router.push(newUrl);
  };

  if (price == undefined && !selectedCategories.length) {
    return <></>;
  }

  return (
    <div className="align-center flex flex-row overflow-x-auto overflow-y-auto text-xs md:hidden">
      {selectedCategories?.map(
        (category) =>
          category && (
            <div
              key={category.id}
              className="text-black/50 mx-1 flex w-fit min-w-fit flex-row items-center rounded-full border-2 bg-[#000000]/[0.08] p-1"
            >
              <div className="mx-2">{category.attributes.name}</div>
              <div onClick={() => removeTaxon(category.id)}>
                <FilterX />
              </div>
            </div>
          )
      )}
      {price && (
        <div className="text-black/50 mx-1 flex w-fit min-w-fit flex-row items-center rounded-full border-2 bg-[#000000]/[0.08] p-1">
          <div className="mx-2">
            {price[0] ? `${price[0]}円` : ''}~{price[1] < 100_000 ? `${price[1]}円` : ''}
          </div>
          <div onClick={clearPrice}>
            <FilterX />
          </div>
        </div>
      )}
      <div className="sticky right-0 ml-auto mr-1">
        <div className="flex h-full bg-white-base">
          <div className="my-auto" onClick={clearAll}>
            <TrashIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
