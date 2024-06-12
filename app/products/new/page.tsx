import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Suspense } from 'react';
import { getTaxonsId, renderProductOverviewWithPagination } from '../../page';

export default async function Page({ searchParams }: { searchParams?: { page?: string } }) {
  const newTaxonId = await getTaxonsId('新着');
  const currentPage = searchParams?.page || '1';
  return (
    <div className="h-full w-full">
      <div className="mx-auto flex w-full flex-col pt-[126px]">
        <div className="flex flex-col items-center gap-6 px-[46.5px] py-6">
          <Suspense fallback={<LoadingSpinner />}>
            {newTaxonId && renderProductOverviewWithPagination(newTaxonId, '新着', currentPage)}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
