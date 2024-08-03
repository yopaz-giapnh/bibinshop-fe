import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Suspense } from 'react';
import { SnsHeader } from './sns-header';
import { SnsUserList } from './sns-user-list';

export async function Sns() {
  return (
    <div className="mx-auto flex h-full w-full flex-col items-center bg-paleFrostBlue pb-[48px] pt-[73px] md:px-32 md:pt-[128px]">
      <SnsHeader />
      <Suspense fallback={<LoadingSpinner />}>
        <SnsUserList />
      </Suspense>
    </div>
  );
}
