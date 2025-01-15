import { BackButton } from '@/components/button/back-button';
import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';
import { OrderHistoryTabContentSkeleton } from './order-history-tab-content-skeleton';

const tabs = [
  { label: 'すべて', value: 'all' },
  { label: '発送予定', value: 'ready' },
  { label: '配送中', value: 'shipped' },
  { label: '配送完了', value: 'delivered' }
] as const;

export const OrderHistorySkeleton = () => (
  <>
    <div className="mb-[24px] flex w-full items-center justify-between md:justify-center">
      <BackButton />
      <Typography as="boldXLarge" element="p" className="text-[18px] text-black-90 md:text-[24px]">
        注文履歴
      </Typography>
      <div className="h-7 w-7" />
    </div>

    {/* タブリスト */}
    <div className="flex h-fit w-full overflow-hidden border-[1px] bg-white-base">
      {tabs.map((tab, index) => (
        <div key={tab.value} className="flex w-[90px] items-center md:w-full">
          <div className="flex flex-1 flex-col items-center justify-center py-2">
            <span className="text-[14px] font-medium text-gray-700 md:text-[18px]">
              {tab.label}
            </span>
            <Skeleton className="mt-1 h-8 w-16 bg-gray-200" />
          </div>
          {index !== tabs.length - 1 && <div className="h-[60px] w-[1px] bg-gray-300" />}
        </div>
      ))}
    </div>

    {/* タブコンテンツ */}
    <div className="mt-4 w-full">
      <OrderHistoryTabContentSkeleton />
    </div>
  </>
);
