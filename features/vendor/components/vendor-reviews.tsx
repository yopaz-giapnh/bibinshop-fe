import { SortButton } from '@/components/button/sort-button';
import { Progress } from '@/components/ui/progress';
import Rating from '@/features/review/components/rating';
import { Suspense } from 'react';
import { VendorReviewList } from './vendor-review-list';

type Props = {
  vendorId: string;
};

export async function VendorReviews({ vendorId }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-col">
          <Rating star={3.5} size={32} withLabel readOnly />
          <div>
            <div className="flex items-center justify-center">
              <Progress value={56} className="mr-2 h-2 w-[100px]" />
              <Rating star={5} readOnly parsent={56} size={22} />
            </div>
            <div className="flex items-center justify-center">
              <Progress value={10} className="mr-2 h-2 w-[100px]" />
              <Rating star={4} readOnly parsent={10} size={22} />
            </div>
            <div className="flex items-center justify-center">
              <Progress value={9} className="mr-2 h-2 w-[100px]" />
              <Rating star={3} readOnly parsent={9} size={22} />
            </div>
            <div className="flex items-center justify-center">
              <Progress value={11} className="mr-2 h-2 w-[100px]" />
              <Rating star={2} readOnly parsent={11} size={22} />
            </div>
            <div className="flex items-center justify-center">
              <Progress value={4} className="mr-2 h-2 w-[100px]" />
              <Rating star={1} readOnly parsent={4} size={22} />
            </div>
          </div>
        </div>
        <div className="ml-14 mt-6">
          <div className="absolute right-0 mr-14">
            {/* TODO: ソートのやつ検討 */}
            <SortButton />
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <VendorReviewList vendorId={vendorId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
