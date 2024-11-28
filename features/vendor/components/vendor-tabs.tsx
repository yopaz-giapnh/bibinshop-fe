import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Suspense } from 'react';
import { Vendor } from '../types';
import VendorInfo from './vendor-info';
import { VendorProducts } from './vendor-products';
import { VendorReviews } from './vendor-reviews';

type VendorTabsProps = {
  vendor: Vendor;
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

/**
 * ベンダーページタブコンポーネント
 * @returns JSX.Element
 */
export default async function VendorTabs({ vendor, searchParams }: VendorTabsProps) {
  const productsCount = vendor.attributes.available_products_count || 0;
  const avgReview = vendor.attributes.stars;
  const currentTab = Array.isArray(searchParams.tab)
    ? searchParams.tab[0]
    : searchParams.tab || 'products';

  const tabs = [
    { label: `商品(${productsCount}件)`, value: 'products' },
    { label: `レビュー(${avgReview}★)`, value: 'review' },
    { label: 'ショップ情報', value: 'shopInfo' }
  ];

  return (
    <Tabs defaultValue={currentTab} className="flex flex-col">
      <TabsList className="z-0 my-2 w-full bg-white-base">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex text-[14px] md:text-[16px]"
            asChild
          >
            <Link
              href={{
                query: {
                  ...searchParams,
                  tab: tab.value
                }
              }}
              scroll={false}
            >
              {tab.label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="relative top-[-5px] mx-[-16px] border-[1px] md:top-[-2px] md:mx-[0]" />
      <TabsContent value="products">
        <VendorProducts vendorId={vendor.id} searchParams={searchParams} />
      </TabsContent>
      <TabsContent value="review">
        <Suspense fallback={<LoadingSpinner />}>
          <VendorReviews vendor={vendor} searchParams={searchParams} />
        </Suspense>
      </TabsContent>
      <TabsContent value="shopInfo">
        <div className="mt-6 flex w-full justify-center">
          <VendorInfo vendor={vendor} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
