import { BackButton } from '@/components/button/back-button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
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
      <div className="mb-[24px] flex w-full items-center justify-between md:justify-center">
        <BackButton />
        <Typography
          as="boldXLarge"
          element="p"
          className="text-[18px] text-black-90 md:text-[24px]"
        >
          注文履歴
        </Typography>
        <div className="h-7 w-7" />
      </div>
      <Tabs defaultValue={tabState} className="z-0 w-full items-center justify-center">
        <TabsList className="w-full pb-4">
          {tabs.map((tab) => (
            <Link
              key={tab.value}
              href={`?state=${tab.value}`}
              passHref
              className="w-[120px] md:w-full"
            >
              <TabsTrigger
                value={tab.value}
                className="w-[120px] text-[14px] md:w-full md:text-[20px]"
              >
                {tab.label}
              </TabsTrigger>
            </Link>
          ))}
        </TabsList>
        <div className="relative top-[-2px] border-[1px]" />
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <Suspense fallback={<LoadingSpinner />}>
              <OrderHistoryTabContent status={tabState} currentPage={currentPage} />
            </Suspense>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
