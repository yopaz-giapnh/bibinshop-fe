import { getTaxonsId, renderProductOverviewWithPagination } from '@/app/page';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Suspense } from 'react';

export default async function Page({ searchParams }: { searchParams?: { page?: string } }) {
  const bestSellerTaxonId = await getTaxonsId('ベストセラー');
  const currentPage = searchParams?.page || '1';

  return (
    <div className="h-full w-full">
      <div className="mx-auto flex w-full flex-col pt-[126px]">
        <div className="flex flex-col items-center gap-6 px-[8px] py-6 md:px-[46.5px]">
          <Suspense fallback={<LoadingSpinner />}>
            {bestSellerTaxonId &&
              renderProductOverviewWithPagination(bestSellerTaxonId, 'ベストセラー', currentPage)}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
