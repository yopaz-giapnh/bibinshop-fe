import { Suspense } from 'react';
import { SnsListSkeleton } from './skeletons/sns-list-skeleton';
import { SnsHeader } from './sns-header';
import { SnsUserList } from './sns-user-list';

export async function Sns() {
  return (
    <div className="mx-auto flex h-full w-full flex-col items-center bg-paleFrostBlue pb-[48px] pt-[73px] md:px-32 md:pt-[150px]">
      <SnsHeader />
      <Suspense fallback={<SnsListSkeleton />}>
        <SnsUserList />
      </Suspense>
    </div>
  );
}
