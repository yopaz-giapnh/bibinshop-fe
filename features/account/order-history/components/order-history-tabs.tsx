import { BackButton } from '@/components/button/back-button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Typography } from '@/components/ui/typography';
import { Order } from '@/features/order/types';
import Link from 'next/link';
import { Suspense } from 'react';
import { getAccountOrders } from '../actions';
import { OrderHistoryTabContent } from './order-history-tab-content';

type Props = {
  currentPage: number;
  tabState: string;
};

const tabs = [
  { label: 'すべて', value: 'all' },
  { label: '発送予定', value: 'ready' },
  { label: '配送中', value: 'shipped' },
  { label: '配送完了', value: 'delivered' }
] as const;

/**
 * 注文履歴タブコンポーネント
 * @returns JSX.Element
 */
export async function OrderHistoryTabs({ currentPage, tabState }: Props) {
  const allOrders = await getAccountOrders({ page: currentPage });
  const filteredOrders = filterOrdersByTabState(allOrders.data, tabState);

  const getOrderCount = (state: string) => {
    return filterOrdersByTabState(allOrders.data, state).length;
  };

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
        <TabsList className="flex h-fit w-full overflow-hidden border-[1px] bg-white-base">
          {tabs.map((tab, index) => (
            <Link
              key={tab.value}
              href={`?state=${tab.value}`}
              passHref
              className="flex w-[90px] items-center md:w-full"
            >
              <TabsTrigger
                value={tab.value}
                className="flex flex-1 flex-col items-center justify-center py-2 text-[14px] md:text-[20px]"
              >
                <span>{tab.label}</span>
                <Typography
                  as="boldXLarge"
                  element="p"
                  className={`text-[18px] md:text-[24px] ${
                    tab.value === tabState ? 'text-bibinBlue-100' : ''
                  }`}
                >
                  {getOrderCount(tab.value)}
                </Typography>
              </TabsTrigger>
              {index !== tabs.length - 1 && <div className="h-[60px] w-[1px] bg-gray-300" />}
            </Link>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <Suspense fallback={<LoadingSpinner />}>
              <OrderHistoryTabContent
                orders={{
                  data: filteredOrders,
                  meta: {
                    total_pages: allOrders.meta.total_pages ?? 1
                  }
                }}
                status={tabState}
                currentPage={currentPage}
              />
            </Suspense>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}

function filterOrdersByTabState(orders: Order[], tabState: string) {
  if (tabState === 'all') return orders;

  return orders.filter((order) => {
    const shipmentState = order.attributes.shipment_state;

    switch (tabState) {
      case 'ready':
        return shipmentState === 'ready' || shipmentState === 'pending';
      case 'shipped':
        return shipmentState === 'shipped' || shipmentState === 'partial';
      case 'delivered':
        return shipmentState === 'delivered';
      default:
        return false;
    }
  });
}
