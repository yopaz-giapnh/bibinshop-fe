import Pagination from '@/features/pagination/components/pagination';
import { getReviews } from '@/features/review/actions';
import { ReviewListWithAvator } from '@/features/review/components/review-list-with-avator';

type Props = {
  vendorId: string;
  currentPage?: number;
};

export async function VendorReviewList({ vendorId, currentPage = 1 }: Props) {
  const reviews = await getReviews({
    query: {
      'filter[vendor_ids]': vendorId,
      page: currentPage,
      per_page: 10
    }
  });

  const totalPages = reviews.meta.total_pages;

  return (
    <>
      <ReviewListWithAvator reviews={reviews.data} />
      {!!totalPages && <Pagination totalPages={totalPages} />}
    </>
  );
}
