import { Typography } from '@/components/ui/typography';
import { UserDetailProfileStats } from '@/features/sns/components/user-detail-profile-stats';
import { UserDetailTabs } from '@/features/sns/components/user-detail-tabs';
import Image from 'next/image';
import Link from 'next/link';
import { getAccount } from '../actions';
import ProfileEditModal from './profile-edit-modal';

/**
 * ユーザープロフィール画像、名前、編集ボタンコンポーネント
 * @returns JSX.Element
 */

type Props = {
  isSpHomeProfile?: boolean;
};

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

  const socialLinks = account?.socialLinks?.map((link) => {
    const platform = link.attributes.platform.toLowerCase();
    return {
      href: link.attributes.url,
      iconSrc: `/${platform}-icon.png`,
      alt: link.attributes.platform
    };
  });

  const Tag = ({ text }: { text: string }) => (
    <Typography as="small" element="p" className="rounded-full bg-blue-200 px-2 py-1 text-sm">
      {text}
    </Typography>
  );

  const SocialLink = ({ href, iconSrc, alt }: { href: string; iconSrc: string; alt: string }) => (
    <Link href={href} target="_blank" rel="noopener noreferrer" passHref>
      <Image src={iconSrc} alt={alt} width={32} height={32} />
    </Link>
  );

  const StatItem = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center">
      <Typography as="boldSmall" element="p" className="text-[16px] md:text-sm">
        {value}
      </Typography>
      <Typography as="caption" element="p" className="text-[12px] md:text-sm">
        {label}
      </Typography>
    </div>
  );

  const UserStats = () => (
    <div className="mb-4 flex items-center justify-center space-x-3 pt-[17px]">
      <StatItem value={reviewsCount.toString()} label="レビュー" />
      <div className="h-[40px] w-[0.5px] bg-gray-400" />
      <StatItem value="121" label="参考になった" />
      <div className="h-[40px] w-[0.5px] bg-gray-400" />
      <StatItem value="121" label="フォロワー" />
      <div className="h-[40px] w-[0.5px] bg-gray-400" />
      <StatItem value="121" label="フォロー中" />
    </div>
  );

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
          <div className="mt-[8px] hidden md:block">
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
