import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectTrigger } from '@/components/ui/select';
import Rating from '@/features/review/components/rating';
import { Suspense } from 'react';
import { Vendor } from '../types';
import { calculateReviewsCountPercent } from '../utils';
import { VendorReviewList } from './vendor-review-list';

type Props = {
  vendor: Vendor;
};

export async function VendorReviews({ vendor }: Props) {
  const avgReview = vendor.attributes.stars;
  const reviewsCount = vendor.attributes.reviews_count;
  const reviewsCountOnePercent = calculateReviewsCountPercent(
    vendor.attributes.reviews_count_one,
    reviewsCount
  );
  const reviewsCountTwoPercent = calculateReviewsCountPercent(
    vendor.attributes.reviews_count_two,
    reviewsCount
  );
  const reviewsCountThreePercent = calculateReviewsCountPercent(
    vendor.attributes.reviews_count_three,
    reviewsCount
  );
  const reviewsCountFourPercent = calculateReviewsCountPercent(
    vendor.attributes.reviews_count_four,
    reviewsCount
  );
  const reviewsCountFivePercent = calculateReviewsCountPercent(
    vendor.attributes.reviews_count_five,
    reviewsCount
  );

  return (
    <div className="flex w-full flex-col">
      <div className="block md:flex md:w-full md:flex-row-reverse md:justify-between">
        <div className="sticky top-28 mx-[-16px] flex justify-center bg-[#F5F6FA] p-2 md:bg-white-base">
          <Select>
            <SelectTrigger className="mx-1 w-fit rounded-full border border-2 border-bibinBlue-100 bg-white-base text-xs font-bold text-bibinBlue-100">
              並べ替え: ランキング順
            </SelectTrigger>
            <SelectContent>
              {/* TODO: select values  */}
              {/* <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem> */}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-[225px]">
          {avgReview != null && <Rating star={avgReview} size={32} withLabel readOnly />}
        </div>
      </div>
      <div className="flex w-full flex-col md:flex-row">
        <div className="flex w-full flex-col md:w-[200px]">
          <div>
            <div className="flex w-full items-center justify-center">
              <Progress value={reviewsCountFivePercent} className="mr-2 h-2  w-full md:w-[100px]" />
              <Rating star={5} readOnly parsent={reviewsCountFivePercent} size={22} />
            </div>
            <div className="flex w-full items-center justify-center">
              <Progress value={reviewsCountFourPercent} className="mr-2 h-2  w-full md:w-[100px]" />
              <Rating star={4} readOnly parsent={reviewsCountFourPercent} size={22} />
            </div>
            <div className="flex w-full  items-center justify-center">
              <Progress
                value={reviewsCountThreePercent}
                className="mr-2 h-2  w-full md:w-[100px]"
              />
              <Rating star={3} readOnly parsent={reviewsCountThreePercent} size={22} />
            </div>
            <div className="flex w-full  items-center justify-center">
              <Progress value={reviewsCountTwoPercent} className="mr-2 h-2  w-full md:w-[100px]" />
              <Rating star={2} readOnly parsent={reviewsCountTwoPercent} size={22} />
            </div>
            <div className="flex w-full items-center  justify-center">
              <Progress value={reviewsCountOnePercent} className="mr-2 h-2  w-full md:w-[100px]" />
              <Rating star={1} readOnly parsent={reviewsCountOnePercent} size={22} />
            </div>
          </div>
        </div>
        <div className="mt-6 md:ml-14">
          {/* TODO: api ができてから */}
          {/* <div className="absolute right-0 mr-14">
            <SortButton />
          </div> */}
          <Suspense fallback={<LoadingSpinner />}>
            <VendorReviewList vendorId={vendor.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
