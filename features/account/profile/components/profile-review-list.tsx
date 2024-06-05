import { Typography } from '@/components/ui/typography';
import { getReviews } from '@/features/review/actions';
import Pagenation from '../../components/pagenation';
import ProfileReviewEmptyView from './profile-review-empty-view';
import { ProfileReviewItem } from './profile-review-item';

/**
 * ユーザープロフィールレビューリストコンポーネント
 * @returns JSX.Element
 */
export default async function ProfileReviewList() {
  const reviews = await getReviews({
    query: {
      // TODO: アカウントIDを取得する
      'filter[user_ids]': '1'
    }
  });
  const reviewsEmpty = (reviews.meta.total_count ?? 0) === 0;

  return (
    <div className="mx-auto flex h-screen w-full flex-col p-[24px]">
      {reviewsEmpty ? (
        <ProfileReviewEmptyView />
      ) : (
        <div>
          <div className="h-screen-calc overflow-y-auto rounded-[6px] bg-white-base p-[24px]">
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
          {/* TODO: 自分がレビューした商品の一覧ページング */}
          <Pagenation />
        </div>
      )}
    </div>
  );
}
