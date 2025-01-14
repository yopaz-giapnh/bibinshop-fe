'use client';

import { LoadingSpinner } from '@/components/ui/loading-spinner';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { getPointAquisitionHistory, getPointUsageHistory } from '../actions';
import { AggregatedPointAcquisition, MergedHistoryItem } from '../types';
import { aggregatePointAcquisitionByDate, mergePointHistory } from '../util';
import PointExpirationEmptyView from './point-expiration-empty-view';
import PointExpirationItem from './point-expiration-item';
import PointHistoryEmptyView from './point-history-empty-view';
import PointHistoryItem from './point-history-item';

type Props = {
  currentPage: number;
  tabState: string;
};

const ITEMS_PER_PAGE = 10;

const tabs = [
  {
    label: 'ポイント履歴',
    value: 'point-history'
  },
  { label: '有効期限', value: 'expiration' }
] as const;

export function PointBalanceTabs({ tabState, currentPage }: Props) {
  const [page, setPage] = useState(currentPage || 1);
  const [mergeHistoryData, setMergeHistoryData] = useState<MergedHistoryItem[]>([]);
  const [aggregatePointAcquisitionByDateData, setAggregatePointAcquisitionByDateData] = useState<
    AggregatedPointAcquisition[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const pointAquisitonHistory = await getPointAquisitionHistory();
      const pointUsageHistory = await getPointUsageHistory();
      const mergedData = mergePointHistory(pointAquisitonHistory, pointUsageHistory);
      const aggregatedData = aggregatePointAcquisitionByDate(pointAquisitonHistory);

      setMergeHistoryData(mergedData);
      setAggregatePointAcquisitionByDateData(aggregatedData);
    };

    fetchData();
  }, []);

  // ページネーション用のデータスライス処理
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedHistoryData = mergeHistoryData.slice(startIndex, endIndex);
  const paginatedExpirationData = aggregatePointAcquisitionByDateData.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const renderPagination = (totalItems: number) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    if (totalPages <= 1) return null;

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) handlePageChange(page - 1);
              }}
              disable={page === 1}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(pageNum);
                }}
                isActive={page === pageNum}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPages) handlePageChange(page + 1);
              }}
              disable={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

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
                  <>
                    <div className="m-[16px] rounded-md bg-white-base px-[16px] shadow-sm md:px-[24px]">
                      {paginatedHistoryData.map((item, index) => (
                        <PointHistoryItem
                          key={index}
                          date={item.date}
                          time={item.time}
                          reason={item.reason}
                          expiresAt={item.expiresAt}
                          amount={item.amount}
                          orderId={item.orderId}
                          isLastItem={index === paginatedHistoryData.length - 1}
                        />
                      ))}
                    </div>
                    <div className="mt-4 flex justify-center">
                      {renderPagination(mergeHistoryData.length)}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div>
                {aggregatePointAcquisitionByDateData.length === 0 ? (
                  <PointExpirationEmptyView />
                ) : (
                  <>
                    <div className="m-[16px] rounded-md bg-white-base px-[16px] shadow-sm md:px-[24px]">
                      {paginatedExpirationData.map((item, index) => (
                        <PointExpirationItem
                          key={index}
                          date={item.date}
                          points={item.totalAmount}
                          isLastItem={index === paginatedExpirationData.length - 1}
                        />
                      ))}
                    </div>
                    <div className="mt-4 flex justify-center">
                      {renderPagination(aggregatePointAcquisitionByDateData.length)}
                    </div>
                  </>
                )}
              </div>
            )}
          </Suspense>
        </TabsContent>
      ))}
    </Tabs>
  );
}
