'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarTrigger
} from '@/components/ui/menubar';
import { Typography } from '@/components/ui/typography';
import { getTaxons } from '@/features/taxon/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';

type Props = {
  getTaxons: ReturnType<typeof getTaxons>;
};

export function FilterForm({ getTaxons }: Props) {
  const categoriesList = use(getTaxons);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const taxons = searchParams.getAll('taxons');
    setSelectedCategories(taxons);
  }, [searchParams]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    let updatedTaxons: string[];
    if (checked) {
      updatedTaxons = [...selectedCategories, category].filter(
        (value, index, self) => self.indexOf(value) === index
      );
    } else {
      updatedTaxons = selectedCategories.filter((c) => c !== category);
    }
    setSelectedCategories(updatedTaxons);

    // 現在の URL から既存のクエリパラメーターを取得
    const currentUrl = new URL(window.location.href);
    const currentParams = new URLSearchParams(currentUrl.search);

    // taxons パラメーターを更新
    currentParams.delete('taxons'); // 既存の taxons パラメーターを削除
    updatedTaxons.forEach((taxon) => currentParams.append('taxons', taxon));

    // 更新後のクエリパラメーターを含む URL を作成して遷移
    const newUrl = `${currentUrl.pathname}?${currentParams.toString()}`;
    router.push(newUrl);
  };

  const handleClearCategories = () => {
    setSelectedCategories([]);

    // 現在の URL から既存のクエリパラメーターを取得
    const currentUrl = new URL(window.location.href);
    const currentParams = new URLSearchParams(currentUrl.search);

    // taxons パラメーターを削除
    currentParams.delete('taxons');

    // 更新後のクエリパラメーターを含む URL を作成して遷移
    const newUrl = `${currentUrl.pathname}?${currentParams.toString()}`;
    router.push(newUrl);
  };

  const handleCategoryChangeDelayed = (category: string, checked: boolean) => {
    let updatedTaxons: string[];
    if (checked) {
      updatedTaxons = [...selectedCategories, category].filter(
        (value, index, self) => self.indexOf(value) === index
      );
    } else {
      updatedTaxons = selectedCategories.filter((c) => c !== category);
    }
    setSelectedCategories(updatedTaxons);
  };
  const applyCategoryChange = () => {
    // 現在の URL から既存のクエリパラメーターを取得
    const currentUrl = new URL(window.location.href);
    const currentParams = new URLSearchParams(currentUrl.search);

    // taxons パラメーターを更新
    currentParams.delete('taxons'); // 既存の taxons パラメーターを削除
    selectedCategories.forEach((taxon) => currentParams.append('taxons', taxon));

    // 更新後のクエリパラメーターを含む URL を作成して遷移
    const newUrl = `${currentUrl.pathname}?${currentParams.toString()}`;
    router.push(newUrl);
  };

  return (
    <div className="mx-1 my-2 w-[216px] md:my-0 md:space-y-6">
      <div className="hidden md:block">
        <Typography as="linkSmall" element="p" className="mb-[20px] text-[20px] text-black-80">
          絞り込み
        </Typography>
        <div className="mb-2 flex items-center justify-between">
          <Typography as="body" element="p" className="text-[16px]">
            カテゴリー
          </Typography>
          <button type="button" onClick={handleClearCategories}>
            <Typography as="body" element="p" className="text-[16px] font-bold text-bibinBlue-100">
              すべてクリア
            </Typography>
          </button>
        </div>
        <div className="flex flex-col space-y-2">
          {categoriesList.map((category, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                value={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked: boolean) => handleCategoryChange(category.id, checked)}
                id={`category-${index}`}
              />
              <Typography as="body" element="p" className="text-[14px] text-black-80">
                {category.attributes.name}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      <Menubar className="h-[30px] w-full rounded-full border-2 border-bibinBlue-100 bg-white-base font-bold text-bibinBlue-100 md:hidden">
        <MenubarMenu>
          <MenubarTrigger>
            カテゴリー{selectedCategories.length ? `(${selectedCategories.length})` : ''}
          </MenubarTrigger>
          <MenubarPortal>
            <MenubarContent
              onCloseAutoFocus={applyCategoryChange}
              className="mt-2 max-h-80 w-screen overflow-y-auto overflow-x-hidden bg-white-base"
              align="start"
              sideOffset={5}
              alignOffset={-3}
            >
              {categoriesList.map((category, index) => (
                <MenubarItem
                  key={index}
                  className="m-4 flex w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryChangeDelayed(
                      category.id,
                      !selectedCategories.includes(category.id)
                    );
                  }}
                >
                  <Checkbox
                    className="rounded-full"
                    value={category.id}
                    checked={selectedCategories.includes(category.id)}
                    id={`category-${index}`}
                  />
                  <Typography as="body" element="p" className="ml-2 text-[14px] text-black-80">
                    {category.attributes.name}
                  </Typography>
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarPortal>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
