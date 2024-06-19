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
    <div className="ml-[24px] flex items-center">
      <div className="relative h-[100px] w-[100px]">
        <Image
          src={account.avatar?.url || '/placeholder-product-image.png'}
          className="rounded-[100px]"
          layout="fill"
          objectFit="cover"
          alt={''}
        />
      </div>
      <div className="ml-[24px]">
        <Typography as="bold" element="p" className="text-[20px] text-black-90 ">
          {account.attributes.nickname}
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
