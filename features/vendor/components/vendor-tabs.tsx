import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  const productsCount = vendor.relationships.products?.data?.length;
  const avgReview = vendor.attributes.stars;

  const tabs = [
    { label: `商品(${productsCount}件)`, value: 'products' },
    { label: `レビュー(${avgReview}★)`, value: 'review' },
    { label: 'ショップ情報', value: 'shopInfo' }
  ];

  return (
    <Tabs defaultValue={tabs[0].value} className="justify-center">
      <TabsList className="bg-color-white my-2 w-full">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="relative top-[-2px] border-[1px]" />
      <TabsContent value="products">
        <VendorProducts vendorId={vendor.id} searchParams={searchParams} />
      </TabsContent>
      <TabsContent value="review">
        <Suspense fallback={<LoadingSpinner />}>
          <VendorReviews vendor={vendor} />
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
