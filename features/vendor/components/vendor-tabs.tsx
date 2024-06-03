import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Vendor } from '../types';
import VendorInfo from './vendor-info';
import { VendorProducts } from './vendor-products';
import { VendorReviews } from './vendor-reviews';

type VendorTabsProps = {
  review: number;
  vendor: Vendor;
};

/**
 * ベンダーページタブコンポーネント
 * @returns JSX.Element
 */
export default async function VendorTabs({ review, vendor }: VendorTabsProps) {
  const productsCount = vendor.relationships.products?.data?.length;
  const tabs = [
    { label: `商品(${productsCount}件)`, value: 'products' },
    { label: `レビュー(${review}★)`, value: 'review' },
    { label: 'ショップ情報', value: 'shopInfo' }
  ];

  return (
    <Tabs defaultValue={tabs[0].value} className="justify-center">
      <TabsList className="bg-color-white w-full pb-4">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="relative top-[-2px] border-[1px]" />
      <TabsContent value="products">
        <VendorProducts vendorId={vendor.id} />
      </TabsContent>
      <TabsContent value="review">
        <VendorReviews />
      </TabsContent>
      <TabsContent value="shopInfo">
        <div className="mt-6 flex justify-center">
          <VendorInfo vendor={vendor} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
