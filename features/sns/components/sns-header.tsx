import { Typography } from '@/components/ui/typography';
import { UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function SnsHeader() {
  return (
    <div className="mt-[24px] flex w-full justify-center md:justify-between">
      <div className="flex flex-col items-center md:items-start">
        <Image src={'/bibin-sns-logo.png'} alt={'sns banner'} width={144} height={37} />
        <Typography
          as="boldTitle"
          element="h1"
          className="mt-[8px] text-[18px] text-text-100 md:text-[20px]"
        >
          自分に合った商品を探そう
        </Typography>
      </div>
      <Link
        href={'/account/profile'}
        className="hidden h-[48px] items-center rounded-full border-[1px] border-bibinBlue-100 px-[24px] py-[4px] md:flex"
        passHref
      >
        <UserRound className="h-6 w-6" color="#51B7FF" />
        <Typography
          as="boldTitle"
          element="h1"
          className="ml-[4px] text-[14px] text-bibinBlue-100 md:block"
        >
          マイプロフィール
        </Typography>
      </Link>
    </div>
  );
}
