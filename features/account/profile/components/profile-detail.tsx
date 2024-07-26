import { Typography } from '@/components/ui/typography';
import { UserDetailProfileStats } from '@/features/sns/components/user-detail-profile-stats';
import { UserDetailTabs } from '@/features/sns/components/user-detail-tabs';
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
  const reviewsCount = account.relationships.reviews?.data?.length || 0;
  const followersCount = account.attributes.followers_count || 0;
  const followeesCount = account.attributes.followees_count || 0;
  const userUniqueKey = account.attributes.unique_key;
  const avatarUrl = account.avatar?.url || '/placeholder-product-image.png';
  const nickname = account.attributes.nickname || '名無し';
  const receivedFeedbackReviewsCount = account.attributes.received_feedback_reviews_count || 0;

  // TODO:demoデータ。あとで置き換える
  const tags = ['普通肌', '肌色: イエベ春タイプ', 'ニキビ', '毛穴'];

  // TODO:demoデータ。あとで置き換える
  const socialLinks = [
    {
      href: 'https://www.instagram.com/bibinews_/',
      iconSrc: '/instagram-icon.png',
      alt: 'Instagram'
    },
    { href: 'https://www.facebook.com/bibinews_/', iconSrc: '/facebook-icon.png', alt: 'Facebook' },
    { href: 'https://www.x.com/bibinews_/', iconSrc: '/x-icon.png', alt: 'X' }
  ];

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
            <ProfileEditModal account={account} />
          </div>
          <div className="hidden md:block">
            <UserDetailProfileStats
              reviewsCount={reviewsCount}
              followersCount={followersCount}
              receivedFeedbackReviewsCount={4}
              followeesCount={followeesCount}
              uniqueKey={userUniqueKey}
              tags={tags}
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
              tags={tags}
              socialLinks={socialLinks}
            />
          </div>
          <UserDetailTabs tabState="review" currentPage={1} userDetail={account} />
        </>
      )}
    </div>
  );
}
