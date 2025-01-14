import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Suspense } from 'react';
import { getPointAquisitionHistory, getPointUsageHistory } from '../actions';
import { aggregatePointAcquisitionByDate, mergePointHistory } from '../util';
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

export async function PointBalanceTabs({ tabState }: Props) {
  const pointAquisitonHistory = await getPointAquisitionHistory();
  const pointUsageHistory = await getPointUsageHistory();
  const mergeHistoryData = mergePointHistory(pointAquisitonHistory, pointUsageHistory);
  // HACK: サンプルデータ
  // const mergeHistoryData = sampleMergedHistory;
  const aggregatePointAcquisitionByDateData =
    aggregatePointAcquisitionByDate(pointAquisitonHistory);
  // HACK: サンプルデータ
  // aggregatedResult;

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
                {mergeHistoryData.length === 0 ? (
                  <PointHistoryEmptyView />
                ) : (
                  <div className="m-[16px] rounded-md bg-white-base px-[16px] shadow-sm md:px-[24px]">
                    {mergeHistoryData.map((item, index) => (
                      <PointHistoryItem
                        key={index}
                        date={item.date}
                        time={item.time}
                        reason={item.reason}
                        expiresAt={item.expiresAt}
                        amount={item.amount}
                        orderId={item.orderId}
                        isLastItem={index === mergeHistoryData.length - 1}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {aggregatePointAcquisitionByDateData.length === 0 ? (
                  <PointExpirationEmptyView />
                ) : (
                  <div className="m-[16px] rounded-md bg-white-base px-[16px] shadow-sm md:px-[24px]">
                    {aggregatePointAcquisitionByDateData.map((item, index) => (
                      <PointExpirationItem
                        key={index}
                        date={item.date}
                        points={item.totalAmount}
                        isLastItem={index === aggregatePointAcquisitionByDateData.length - 1}
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
