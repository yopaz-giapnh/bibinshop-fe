import { BackButton } from '@/components/button/back-button';
import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';
import { PointBalanceTabContentSkeleton } from './point-balance-tab-content-skeleton';

const tabs = [
  {
    label: 'ポイント履歴',
    value: 'point-history'
  },
  { label: '有効期限', value: 'expiration' }
] as const;

export const PointBalanceSkeleton = () => (
  <div className="mx-auto flex w-full flex-col items-center bg-paleFrostBlue pt-[16px] md:p-[24px]">
    {/* ヘッダー */}
    <div className="mb-[14px] flex w-full items-center justify-between px-[16px] md:mb-[24px] md:justify-center">
      <BackButton />
      <Typography as="boldXLarge" element="p" className="text-[18px] text-black-90 md:text-[24px]">
        ポイント残高
      </Typography>
      <div className="h-7 w-7" />
    </div>

    {/* ポイント表示 */}
    <div className="flex w-full flex-col items-center justify-center bg-indigo-400 py-8 md:rounded-[4px]">
      <Skeleton className="h-14 w-40 bg-gray-200" />
      <Skeleton className="mt-2 h-5 w-20 bg-gray-200" />
    </div>

    {/* タブ */}
    <div className="mt-[16px] w-full flex-col items-center justify-center md:flex">
      {/* タブリスト */}
      <div className="scrollbar-hide w-full flex-nowrap overflow-x-auto overflow-y-hidden pb-4 md:w-1/2 md:overflow-x-visible">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab, index) => (
            <div
              key={tab.value}
              className={`flex w-[180px] items-center justify-center border-b-2 py-2 text-[14px] md:w-full md:text-[16px] ${
                index === 0 ? 'border-blue-500' : 'border-transparent'
              }`}
            >
              <span
                className={`ml-[4px] font-medium ${index === 0 ? 'text-blue-500' : 'text-gray-700'}`}
              >
                {tab.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* タブコンテンツ */}
      <PointBalanceTabContentSkeleton />
    </div>
  </div>
);
