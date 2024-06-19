import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';
import { Suspense } from 'react';
import { OrderHistoryTabContent } from './order-history-tab-content';

type Props = {
  currentPage: number;
  tabState: string;
};

const tabs = [
  { label: 'すべて', value: 'all' },
  { label: '処理中', value: 'processing' },
  { label: '出荷済み', value: 'shipped' }
] as const;

/**
 * 注文履歴タブコンポーネント
 * @returns JSX.Element
 */
export async function OrderHistoryTabs({ currentPage, tabState }: Props) {
  return (
    <>
      <Typography as="boldXLarge" element="p" className="mb-[24px] text-[24px] text-black-90">
        注文履歴
      </Typography>
      <Tabs defaultValue={tabState} className="w-full justify-center">
        <TabsList className="w-full pb-4">
          {tabs.map((tab) => (
            <Link key={tab.value} href={`?state=${tab.value}`} passHref>
              <TabsTrigger value={tab.value}>{tab.label}</TabsTrigger>
            </Link>
          ))}
        </TabsList>
        <div className="relative top-[-2px] border-[1px]" />
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <Suspense fallback={<div>Loading...</div>}>
              <OrderHistoryTabContent status={tabState} currentPage={currentPage} />
            </Suspense>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
