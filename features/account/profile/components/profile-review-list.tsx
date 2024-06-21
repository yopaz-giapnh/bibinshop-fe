import { Typography } from '@/components/ui/typography';
import Pagination from '@/features/pagination/components/pagination';
import { getReviews } from '@/features/review/actions';
import { getAccount } from '../actions';
import ProfileReviewEmptyView from './profile-review-empty-view';
import { ProfileReviewItem } from './profile-review-item';

/**
 * ユーザープロフィールレビューリストコンポーネント
 * @returns JSX.Element
 */
export default async function ProfileReviewList() {
  const account = await getAccount();
  const reviews = await getReviews({
    query: {
      'filter[user_ids]': account.id
    }
  });
  const reviewsEmpty = (reviews.meta.total_count ?? 0) === 0;
  const totalPages = reviews.meta.total_pages;

  return (
    <div className="mx-auto flex h-screen w-full flex-col p-[24px]">
      {reviewsEmpty ? (
        <ProfileReviewEmptyView />
      ) : (
        <div>
          <div className="h-fit overflow-y-auto rounded-[6px] bg-white-base p-[24px]">
            <Typography as="bold" element="p" className="mb-[16px] text-[20px] text-black-90">
              レビュー
            </Typography>
            {reviews.data.map((review, index) => (
              <div key={index}>
                <ProfileReviewItem review={review} />
                {index < reviews.data.length - 1 && (
                  <div className="my-[16px] h-[1px] w-full bg-gray-200" />
                )}
              </div>
            ))}
          </div>
          {!!totalPages && <Pagination totalPages={totalPages} />}
        </div>
      )}
    </div>
  );
}
