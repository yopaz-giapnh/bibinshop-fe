import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import ProfileEditModal from './profile-edit-modal';

export default function ProfileDetail() {
  return (
    <div className="ml-[24px] flex items-center">
      <Image
        src={'/yamada_yuka_demo.png'}
        width={100}
        height={100}
        className="rounded-[100px]"
        alt={''}
      />
      <div className="ml-[24px]">
        <Typography as="bold" element="p" className="text-[20px] text-black-90 ">
          yamada_yuka183
        </Typography>
        <div className="flex items-baseline">
          <Typography as="bold" element="p" className="text-[16px] text-black-90">
            121
          </Typography>
          <Typography as="xSmall" element="p" className="text-[14px] text-black-90">
            レビュー
          </Typography>
        </div>
      </div>
      <ProfileEditModal />
    </div>
  );
}
