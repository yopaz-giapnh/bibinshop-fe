import { BackButton } from '@/components/button/back-button';
import { Typography } from '@/components/ui/typography';
import { getAvailablePoints } from '../actions';
import { PointBalanceTabs } from './point-balance-tabs';

export default async function Coupon() {
  const availablePoints = await getAvailablePoints();

  return (
    <div className="mx-auto flex w-full flex-col items-center bg-paleFrostBlue pt-[16px] md:p-[24px]">
      <div className="mb-[14px] flex w-full items-center justify-between px-[16px] md:mb-[24px] md:justify-center">
        <BackButton />
        <Typography
          as="boldXLarge"
          element="p"
          className="text-[18px] text-black-90 md:text-[24px]"
        >
          ポイント残高
        </Typography>
        <div className="h-7 w-7" />
      </div>
      <div className="flex w-full flex-col items-center justify-center bg-indigo-400 py-8 md:rounded-[4px]">
        <Typography as="boldXLarge" element="p" className="text-[40px] text-white-base">
          {availablePoints}
        </Typography>
        <Typography as="boldSmall" element="p" className="text-[16px] text-white-base">
          合計ポイント
        </Typography>
      </div>
      <PointBalanceTabs currentPage={1} tabState="point-history" />
    </div>
  );
}
