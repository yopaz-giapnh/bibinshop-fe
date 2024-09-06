import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Suspense } from 'react';
import PointExpirationEmptyView from './point-expiration-empty-view';
import PointExpirationItem from './point-expiration-item';
import PointHistoryEmptyView from './point-history-empty-view';
import PointHistoryItem from './point-history-item';

type Props = {
  currentPage: number;
  tabState: string;
};

const tabs = [
  {
    label: 'ポイント履歴',
    value: 'point-history'
  },
  { label: '有効期限', value: 'expiration' }
] as const;

// デモhistoryデータ
const demoHistoryData = [
  {
    date: '2024/07/04',
    time: '16:18:38',
    title: 'ログインボーナス',
    expirationDate: '2025/01/31',
    points: 10
  },
  {
    date: '2024/07/04',
    time: '16:18:38',
    title: 'ログインボーナス',
    expirationDate: '2025/01/31',
    points: 5
  },
  {
    date: '2024/07/04',
    time: '16:18:38',
    title: 'ログインボーナス',
    expirationDate: '2025/01/31',
    points: 3
  },
  {
    date: '2024/07/04',
    time: '16:18:38',
    title: 'ポイント失効',
    expirationDate: '2024/07/03',
    points: -100
  },
  {
    date: '2024/07/04',
    time: '16:18:38',
    title: 'ポイント利用',
    orderNumber: '#0123456789101112',
    points: -1000
  },
  {
    date: '2024/06/20',
    time: '16:18:38',
    title: '買い物ボーナス',
    expirationDate: '2024/07/04',
    points: 3000
  },
  {
    date: '2024/06/01',
    time: '16:18:38',
    title: '初回登録ポイント',
    expirationDate: '2024/07/03',
    points: 100
  }
];

// デモexpirationデータ
const demoExpirationData = [
  {
    date: '2024/07/04',
    points: 10
  },
  {
    date: '2024/07/04',
    points: 10
  },
  {
    date: '2024/07/04',
    points: 10
  },
  {
    date: '2024/07/04',
    points: 10
  },
  {
    date: '2024/07/04',
    points: 10
  }
];

export async function PointBalanceTabs({ tabState }: Props) {
  return (
    <Tabs
      defaultValue={tabState}
      className="mt-[16px] w-full flex-col items-center justify-center md:flex"
    >
      <TabsList className="scrollbar-hide w-full flex-nowrap overflow-x-auto overflow-y-hidden pb-4 md:w-1/2 md:overflow-x-visible">
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            href={`?state=${tab.value}`}
            passHref
            className="w-[120px] md:w-full"
          >
            <TabsTrigger
              value={tab.value}
              className="flex w-[120px] items-center justify-center text-[14px] md:w-full md:text-[20px] "
            >
              <div className="ml-[4px]">{tab.label}</div>
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
      <div className="relative top-[-2px] border-[1px]" />
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="w-full">
          <Suspense fallback={<LoadingSpinner />}>
            {tab.value === 'point-history' ? (
              <div>
                {demoHistoryData.length === 0 ? (
                  <PointHistoryEmptyView />
                ) : (
                  <div className="m-[16px] rounded-md bg-white-base px-[16px] shadow-sm md:px-[24px]">
                    {demoHistoryData.map((item, index) => (
                      <PointHistoryItem
                        key={index}
                        date={item.date}
                        time={item.time}
                        title={item.title}
                        expirationDate={item.expirationDate || ''}
                        points={item.points}
                        orderNumber={item.orderNumber}
                        isLastItem={index === demoHistoryData.length - 1}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {demoExpirationData.length === 0 ? (
                  <PointExpirationEmptyView />
                ) : (
                  <div className="m-[16px] rounded-md bg-white-base px-[16px] shadow-sm md:px-[24px]">
                    {demoExpirationData.map((item, index) => (
                      <PointExpirationItem
                        key={index}
                        date={item.date}
                        points={item.points}
                        isLastItem={index === demoExpirationData.length - 1}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </Suspense>
        </TabsContent>
      ))}
    </Tabs>
  );
}
