import { Typography } from '@/components/ui/typography';
import { getReviews } from '@/features/review/actions';
import { User } from '@/features/users/types';
import Image from 'next/image';
import FollowUnfollowButton from './follow-unfollow-button';
import { UserDetailProfileStats } from './user-detail-profile-stats';

export default async function UserDetailProfile({ userDetail }: { userDetail: User }) {
  const reviews = await getReviews({
    query: {
      'filter[user_ids]': userDetail.id
    }
  });

  const reviewsCount = reviews.data.length;
  const followersCount = userDetail.attributes.followers_count || 0;
  const followeesCount = userDetail.attributes.followees_count || 0;
  const userUniqueKey = userDetail.attributes.unique_key;
  const nickname = userDetail.attributes.nickname || '名無し';
  const avatarUrl = userDetail.avatar?.url || '/placeholder-product-image.png';
  const receivedFeedbackReviewsCount = userDetail.attributes.received_feedback_reviews_count || 0;
  const isFollowing = userDetail.attributes.followed_by_me || false;

  // TODO:demoデータ。あとで置き換える
  const tags = ['普通肌', '肌色: イエベ春タイプ', 'ニキビ', '毛穴'];

  const socialLinks =
    userDetail.socialLinks?.map((link) => {
      const platform = link.attributes.platform.toLowerCase();
      return {
        href: link.attributes.url,
        iconSrc: `/${platform}-icon.png`,
        alt: link.attributes.platform
      };
    }) || [];
  return (
    <div className="bg mt-[24px] w-full items-center justify-center md:flex">
      <div className="mb-[16px] ml-[8px] flex md:mb-0 md:ml-0">
        <Image
          src={avatarUrl}
          alt={nickname}
          width={160}
          height={160}
          className="h-[88px] w-[88px] rounded-full md:h-[160px] md:w-[160px]"
        />
        <div className="ml-4 flex flex-col items-baseline justify-end md:hidden">
          <Typography as="boldSmall" element="h2" className="mb-[8px] mr-[16px] text-[20px]">
            {nickname}
          </Typography>
          <FollowUnfollowButton
            username={nickname}
            unique_key={userUniqueKey}
            isFollowing={isFollowing}
          />
        </div>
      </div>
      <div className="flex flex-col items-center md:ml-6 md:items-start">
        <div className="mb-4 hidden items-center md:flex">
          <Typography as="boldSmall" element="h2" className="mr-[16px] text-[20px]">
            {nickname}
          </Typography>
          <FollowUnfollowButton
            username={nickname}
            unique_key={userUniqueKey}
            isFollowing={isFollowing}
          />
        </div>
        <UserDetailProfileStats
          reviewsCount={reviewsCount}
          followersCount={followersCount}
          followeesCount={followeesCount}
          receivedFeedbackReviewsCount={receivedFeedbackReviewsCount}
          uniqueKey={userUniqueKey}
          tags={tags}
          socialLinks={socialLinks}
        />
      </div>
    </div>
  );
}
