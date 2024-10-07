import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Progress } from '@/components/ui/progress';
import Rating from '@/features/review/components/rating';
import { Suspense } from 'react';
import { Vendor } from '../types';
import { calculateReviewsCountPercent } from '../utils';
import VendorReviewEmptyView from './vendor-review-empty-view';
import { VendorReviewList } from './vendor-review-list';

type Props = {
  vendor: Vendor;
};

const useVendorReviewData = (vendor: Vendor) => {
  const reviewsCount = vendor.attributes.reviews_count ?? 0;
  const calculatePercent = (count: number) =>
    parseFloat(calculateReviewsCountPercent(count, reviewsCount).toFixed(1));

  return {
    avgReview: vendor.attributes.stars,
    reviewsCount,
    reviewsCountPercents: [
      calculatePercent(vendor.attributes.reviews_count_one ?? 0),
      calculatePercent(vendor.attributes.reviews_count_two ?? 0),
      calculatePercent(vendor.attributes.reviews_count_three ?? 0),
      calculatePercent(vendor.attributes.reviews_count_four ?? 0),
      calculatePercent(vendor.attributes.reviews_count_five ?? 0)
    ]
  };
};

const RatingProgressBar = ({ star, percent }: { star: number; percent: number }) => (
  <div className="flex w-full items-center">
    <Progress value={percent} className="mr-2 h-2 w-2/3 md:w-[100px]" />
    <Rating star={star} readOnly parsent={percent} size={22} />
  </div>
);

export function VendorReviews({ vendor }: Props) {
  const { avgReview, reviewsCount, reviewsCountPercents } = useVendorReviewData(vendor);

  return (
    <div className="flex w-full flex-col justify-between">
      <div className="sticky top-[72px] z-40 mx-[-16px] flex justify-center bg-[#F5F6FA] p-2 md:bg-white-base">
        {/* <Select>
          <SelectTrigger className="mx-1 w-fit rounded-full border-2 border-bibinBlue-100 bg-white-base text-xs font-bold text-bibinBlue-100">
            並べ替え: ランキング順
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
          </SelectContent>
        </Select> */}
      </div>
      {reviewsCount !== 0 ? (
        <>
          <div className="z-0 w-full md:w-[225px]">
            {avgReview != null && <Rating star={avgReview} size={32} withLabel readOnly />}
          </div>
          <div className="flex w-full flex-col md:flex-row">
            <div className="flex flex-col items-center md:items-start ">
              <div className="w-full">
                {[5, 4, 3, 2, 1].map((star, index) => (
                  <RatingProgressBar
                    key={star}
                    star={star}
                    percent={reviewsCountPercents[4 - index]}
                  />
                ))}
              </div>
            </div>
            <div className="mt-6 md:ml-14">
              {/* <div className="absolute right-0 mr-14">
                <SortButton />
              </div> */}
              <Suspense fallback={<LoadingSpinner />}>
                <VendorReviewList vendorId={vendor.id} />
              </Suspense>
            </div>
          </div>
        </>
      ) : (
        <VendorReviewEmptyView />
      )}
    </div>
  );
}
