import PointBalance from '@/features/point-balance/components/point-balance';
import { PointBalanceSkeleton } from '@/features/point-balance/components/skeletons/point-balance-skeleton';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <Suspense fallback={<PointBalanceSkeleton />}>
      <PointBalance />
    </Suspense>
  );
}
