'use client';

import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { Vendor } from '../types';

type Props = {
  vendor: Vendor;
};

const VendorInfo = ({ vendor }: Props) => {
  // TODO: API で取得したベンダー情報を表示する(親 component から props でもらってもいいかも)
  const vendorInfo = {
    address: 'B1F, 33, Sangmugongwon-ro, Seo-gu, Gwangju 61958, Republic of Korea',
    mail: 'hoge@gmail.com',
    tel: '+82-070-8744-5678'
  };

  return (
    <Card className="flex h-[340px] w-[580px] flex-col items-center justify-center gap-5 rounded-md bg-[#EEF8FF] p-4">
      <div className="flex w-[532px] flex-col items-center justify-center gap-1 p-0">
        <div className="flex h-[21px] w-[532px] flex-row items-center justify-center gap-1 p-0">
          <Typography
            as="bold"
            element="p"
            className="h-[21px] w-[532px] text-[14px] font-bold leading-[20px] tracking-[0.03em] text-bibinBlue-100"
          >
            {vendor.attributes.name}
          </Typography>
        </div>
        <Typography
          as="bold"
          element="p"
          className="w-[532px] text-[12px] font-medium leading-[17px] tracking-[0.03em] text-primary"
        >
          {vendor.attributes.about_us}
        </Typography>
      </div>
      <div className="flex h-[43px] w-[532px] flex-col items-center justify-center gap-1 p-0">
        <div className="flex h-[21px] w-[532px] flex-row items-center justify-center gap-1 p-0">
          <Typography
            as="bold"
            element="p"
            className="h-[21px] w-[532px] text-[14px] font-bold leading-[20px] tracking-[0.03em] text-bibinBlue-100"
          >
            住所
          </Typography>
        </div>
        <Typography
          as="bold"
          element="p"
          className="h-[18px] w-[532px] text-[12px] font-medium leading-[17px] tracking-[0.03em] text-primary"
        >
          {vendorInfo.address}
        </Typography>
      </div>
      <div className="flex h-[43px] w-[532px] flex-col items-center justify-center gap-1 p-0">
        <div className="flex h-[21px] w-[532px] flex-row items-center justify-center gap-1 p-0">
          <Typography
            as="bold"
            element="p"
            className="h-[21px] w-[532px] text-[14px] font-bold leading-[20px] tracking-[0.03em] text-bibinBlue-100"
          >
            メール
          </Typography>
        </div>
        <Typography
          as="bold"
          element="p"
          className="h-[18px] w-[532px] text-[12px] font-medium leading-[17px] tracking-[0.03em] text-primary"
        >
          {vendorInfo.mail}
        </Typography>
      </div>
      <div className="flex h-[43px] w-[532px] flex-col items-center justify-center gap-1 p-0">
        <div className="flex h-[21px] w-[532px] flex-row items-center justify-center gap-1 p-0">
          <Typography
            as="bold"
            element="p"
            className="h-[21px] w-[532px] text-[14px] font-bold leading-[20px] tracking-[0.03em] text-bibinBlue-100"
          >
            連絡先
          </Typography>
        </div>
        <Typography
          as="bold"
          element="p"
          className="h-[18px] w-[532px] text-[12px] font-medium leading-[17px] tracking-[0.03em] text-primary"
        >
          {vendorInfo.tel}
        </Typography>
      </div>
    </Card>
  );
};

export default VendorInfo;
