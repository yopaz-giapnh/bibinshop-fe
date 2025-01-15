import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Pagination from '@/features/pagination/components/pagination';
import { getPurchasedProducts, getTaxonId } from '@/features/product/actions';
import { ProductOverview } from '@/features/product/components/product-overview';
import { getReviews } from '@/features/review/actions';
import { User } from '@/features/users/types';
import { BriefcaseBusiness, MessageSquareHeart } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { FilteredReviews } from './filterd-reviews';
import ProfileProductEmptyView from './profile-product-empty-view';

type Props = {
  currentPage: number;
  tabState: string;
  userDetail: User;
};

const tabs = [
  {
    label: 'レビュー',
    value: 'review',
    icon: <MessageSquareHeart />
  },
  { label: '購入した商品', value: 'purchased', icon: <BriefcaseBusiness /> }
] as const;

/**
 * ユーザー詳細タブコンポーネント
 * @returns JSX.Element
 */
export async function UserDetailTabs({ currentPage, tabState, userDetail }: Props) {
  const reviews = await getReviews({
    query: {
      'filter[user_ids]': userDetail.id,
      page: currentPage,
      per_page: 10
    }
  });

  const purchasedProducts = await getPurchasedProducts({
    orderedUserId: userDetail.id,
    page: currentPage,
    perPage: 12
  });

  const newTaxonId = await getTaxonId('新着');

  if (!newTaxonId) {
    return notFound();
  }

  return (
    <Tabs
      defaultValue={tabState}
      className="mt-[16px] w-full flex-col items-center justify-center md:flex"
    >
      <TabsList className="scrollbar-hide w-full flex-nowrap overflow-x-auto overflow-y-hidden pb-4 md:w-1/2 md:overflow-x-visible">
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            href={{
              query: {
                state: tab.value,
                page: currentPage
              }
            }}
            passHref
            className="w-[120px] md:w-full"
          >
            <TabsTrigger
              value={tab.value}
              className="flex w-[120px] items-center justify-center text-[14px] md:w-full md:text-[20px] "
            >
              {tab.icon}
              <div className="ml-[4px]">{tab.label}</div>
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
      <div className="relative top-[-2px] border-[1px]" />
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="w-full">
          {/* TODO: スケルトンビュー */}
          <Suspense fallback={<LoadingSpinner />}>
            {tab.value === 'review' ? (
              <>
                <FilteredReviews reviews={reviews.data} />
                {reviews.meta?.total_pages && reviews.meta.total_pages > 1 ? (
                  <Pagination totalPages={reviews.meta.total_pages} />
                ) : null}
              </>
            ) : (
              <div className="mx-[8px]">
                {purchasedProducts.data.length === 0 ? (
                  <ProfileProductEmptyView />
                ) : (
                  <ProductOverview
                    products={purchasedProducts.data}
                    columns={4}
                    totalPages={purchasedProducts.meta.total_pages}
                  />
                )}
              </div>
            )}
          </Suspense>
        </TabsContent>
      ))}
    </Tabs>
  );
}
