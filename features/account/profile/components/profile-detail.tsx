import { Typography } from '@/components/ui/typography';
import { getConcerns } from '@/features/sns/actions';
import { UserDetailProfileStats } from '@/features/sns/components/user-detail-profile-stats';
import { UserDetailTabs } from '@/features/sns/components/user-detail-tabs';
import { getConcernTags } from '@/features/sns/utils';
import Image from 'next/image';
import { getAccount } from '../actions';
import ProfileEditModal from './profile-edit-modal';

type Props = {
  isSpHomeProfile?: boolean;
};

/**
 * ユーザープロフィール画像、名前、編集ボタンコンポーネント
 * @returns JSX.Element
 */
export default async function ProfileDetail({ isSpHomeProfile = false }: Props) {
  const account = await getAccount();
  const concerns = await getConcerns();
  const reviewsCount = account.relationships.reviews?.data?.length || 0;
  const followersCount = account.attributes.followers_count || 0;
  const followeesCount = account.attributes.followees_count || 0;
  const userUniqueKey = account.attributes.unique_key;
  const avatarUrl = account.avatar?.url || '/placeholder-product-image.png';
  const nickname = account.attributes.nickname || '名無し';
  const receivedFeedbackReviewsCount = account.attributes.received_feedback_reviews_count || 0;

  const allTags = getConcernTags({
    skin_type: concerns?.skinType,
    personal_color: concerns?.personalColor,
    skin_concerns: concerns?.skinConcerns,
    scalp_hair_concerns: concerns?.hairConcerns,
    health_concerns: concerns?.healthConcerns
  });

  const skinTags = getConcernTags({
    skin_type: concerns?.skinType,
    personal_color: concerns?.personalColor,
    skin_concerns: concerns?.skinConcerns
  });

  const hairTags = getConcernTags({
    scalp_hair_concerns: concerns?.hairConcerns,
    health_concerns: concerns?.healthConcerns
  });

  const socialLinks = account?.socialLinks?.map((link) => {
    const platform = link?.attributes?.platform?.toLowerCase();
    return {
      href: link?.attributes?.url,
      iconSrc: `/${platform}-icon.png`,
      alt: link?.attributes?.platform
    };
  });

  return (
    <div>
      <div className="flex items-center pl-[16px] md:ml-[24px] md:mr-0 md:justify-normal md:pl-0">
        <div className="relative h-[88px] w-[88px] md:h-[160px] md:w-[160px]">
          <Image src={avatarUrl} className="rounded-[100px]" fill alt={'avatar'} />
        </div>
        <div className="ml-[16px] flex flex-col justify-between">
          <div className="items-center md:flex">
            <Typography
              as="bold"
              element="p"
              className="max-w-[110px] overflow-hidden whitespace-normal break-words pb-[8px] text-[20px] text-black-90 md:max-w-full md:pb-0 md:pr-[16px]"
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {nickname}
            </Typography>
            <ProfileEditModal
              account={account}
              skinTags={skinTags}
              hairTags={hairTags}
              concerns={concerns || undefined}
            />
          </div>
          <div className="mt-[8px] hidden md:block">
            <UserDetailProfileStats
              reviewsCount={reviewsCount}
              followersCount={followersCount}
              receivedFeedbackReviewsCount={receivedFeedbackReviewsCount}
              followeesCount={followeesCount}
              uniqueKey={userUniqueKey}
              tags={allTags}
              socialLinks={socialLinks}
            />
          </div>
        </div>
      </div>
      {!isSpHomeProfile && (
        <>
          <div className="mt-[16px] flex flex-col items-center md:hidden">
            <UserDetailProfileStats
              reviewsCount={reviewsCount}
              followersCount={followersCount}
              followeesCount={followeesCount}
              receivedFeedbackReviewsCount={receivedFeedbackReviewsCount}
              uniqueKey={userUniqueKey}
              tags={allTags}
              socialLinks={socialLinks}
            />
          </div>
          <UserDetailTabs tabState="review" currentPage={1} userDetail={account} />
        </>
      )}
    </div>
  );
}
