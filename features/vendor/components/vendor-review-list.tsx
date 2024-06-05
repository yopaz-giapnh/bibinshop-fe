import { getReviews } from '@/features/review/actions';
import { ReviewListWithAvator } from '@/features/review/components/review-list-with-avator';

type Props = {
  vendorId: string;
};

export async function VendorReviewList({ vendorId }: Props) {
  const reviews = await getReviews({
    query: {
      'filter[vendor_ids]': vendorId
    }
  });

  return <ReviewListWithAvator reviews={reviews.data} />;
}
