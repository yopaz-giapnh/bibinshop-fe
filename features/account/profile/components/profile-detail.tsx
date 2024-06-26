import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import { getAccount } from '../actions';
import ProfileEditModal from './profile-edit-modal';

/**
 * ユーザープロフィール画像、名前、編集ボタンコンポーネント
 * @returns JSX.Element
 */
export default async function ProfileDetail() {
  const account = await getAccount();
  const reviewsCount = account.relationships.reviews?.data?.length || 0;

  return (
    <div className="mr-[24px] flex items-center justify-between md:ml-[24px] md:mr-0 md:justify-normal">
      <div className="relative h-[62px] w-[62px] md:h-[100px] md:w-[100px]">
        <Image
          src={account.avatar?.url || '/placeholder-product-image.png'}
          className="rounded-[100px]"
          layout="fill"
          objectFit="cover"
          alt={''}
        />
      </div>
      <div className="ml-[24px]">
        <Typography
          as="bold"
          element="p"
          className="max-w-[110px] overflow-hidden whitespace-normal break-words text-[16px] text-black-90 md:max-w-full md:text-[20px]"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {!account.attributes.nickname ? '名無し' : account.attributes.nickname}
        </Typography>
        <div className="flex items-baseline">
          <Typography as="bold" element="p" className="text-[16px] text-black-90">
            {reviewsCount}
          </Typography>
          <Typography as="xSmall" element="p" className="text-[14px] text-black-90">
            レビュー
          </Typography>
        </div>
      </div>
      <ProfileEditModal account={account} />
    </div>
  );
}
