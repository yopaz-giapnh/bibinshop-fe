import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/features/product/components/product-card';
import { ComponentProps } from 'react';
import { VendorProducts } from './vendor-products';

type VendorTabsProps = {
  review: number;
  products: ComponentProps<typeof ProductCard>['product'][];
};

/**
 * ベンダーページタブコンポーネント
 * @returns JSX.Element
 */
export default async function VendorTabs({ products, review }: VendorTabsProps) {
  const tabs = [
    { label: `商品(${products.length + 1}件)`, value: 'products' },
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
        <VendorProducts products={products} />
      </TabsContent>
      <TabsContent value="review">
        <div>レビューページ</div>
      </TabsContent>
      <TabsContent value="shopInfo">
        <div>ショップ情報</div>
      </TabsContent>
    </Tabs>
  );
}
