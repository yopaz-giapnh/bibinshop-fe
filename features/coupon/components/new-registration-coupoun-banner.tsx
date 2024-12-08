'use client';

import { Typography } from '@/components/ui/typography';
import { useRouter } from 'next/navigation';

const NewRegistrationCouponBanner = () => {
  const router = useRouter();
  return (
    <div className="w-full bg-bibinViolet-100">
      <button
        onClick={() => {
          router.push('/signup');
        }}
        className="w-full bg-bibinViolet-100"
      >
        <Typography as="bold" element="p" className="text-center text-[14px] text-white-base">
          {/* TODO: @coupon 非ログインユーザーはクーポン一覧取得の API を叩けないため内容がベタ書き */}
          bibin Shop 新規ユーザー10%OFF クーポンゲット！
        </Typography>
      </button>
    </div>
  );
};

export default NewRegistrationCouponBanner;
