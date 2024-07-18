import { Typography } from '@/components/ui/typography';
import Image from 'next/image';

export async function Sns() {
  return (
    <div className="h-full w-full bg-paleFrostBlue">
      <div className="mx-auto flex w-full flex-col items-center pt-[73px] md:h-screen md:pt-[128px]">
        <div className="flex h-full  w-full flex-col">
          <div className="mx-3 mt-3 flex justify-between md:block">
            <Image src={'/bibin-sns-logo.png'} alt={'sns banner'} width={144} height={37} />
            <Typography
              as="boldTitle"
              element="h1"
              className="text-center text-[18px] text-text-100 md:mt-6 md:text-[24px]"
            >
              自分に合った商品を探そう
            </Typography>
            <div className="h-7 w-7" />
          </div>
        </div>
      </div>
    </div>
  );
}
