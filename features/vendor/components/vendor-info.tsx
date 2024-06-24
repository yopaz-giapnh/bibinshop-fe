import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { Vendor } from '../types';

type Props = {
  vendor: Vendor;
};

const VendorInfo = ({ vendor }: Props) => {
  return (
    <Card className="flex w-11/12 flex-col gap-5 rounded-md bg-[#EEF8FF] p-4 md:h-[340px] md:w-[580px] md:items-center md:justify-center">
      <div className="flex flex-col justify-center gap-1 p-0 md:w-[532px] md:items-center">
        <div className="flex h-[21px] flex-row gap-1 p-0 md:w-[532px] md:items-center md:justify-center">
          <Typography
            as="bold"
            element="p"
            className="h-[21px] text-[14px] font-bold leading-[20px] tracking-[0.03em] text-bibinBlue-100 md:w-[532px]"
          >
            {vendor.attributes.name}
          </Typography>
        </div>
        <Typography
          as="bold"
          element="p"
          className="text-[12px] font-medium leading-[17px] tracking-[0.03em] text-stone-950/50 md:w-[532px] md:text-primary"
        >
          {vendor.attributes.about_us}
        </Typography>
      </div>
      <div className="flex h-[43px] flex-col gap-1 p-0 md:w-[532px] md:items-center md:justify-center">
        <div className="flex h-[21px] flex-row gap-1 p-0 md:w-[532px] md:items-center md:justify-center">
          <Typography
            as="bold"
            element="p"
            className="h-[21px] text-[14px] font-bold leading-[20px] tracking-[0.03em] text-bibinBlue-100 md:w-[532px]"
          >
            住所
          </Typography>
        </div>
        <Typography
          as="bold"
          element="p"
          className="h-[18px] text-[12px] font-medium leading-[17px] tracking-[0.03em] text-stone-950/50 md:w-[532px]  md:text-primary"
        >
          {vendor.attributes.address}
        </Typography>
      </div>
      <div className="flex h-[43px] flex-col gap-1 p-0 md:w-[532px] md:items-center md:justify-center">
        <div className="flex h-[21px] flex-row gap-1 p-0 md:w-[532px] md:items-center md:justify-center">
          <Typography
            as="bold"
            element="p"
            className="h-[21px] text-[14px] font-bold leading-[20px] tracking-[0.03em] text-bibinBlue-100 md:w-[532px]"
          >
            メール
          </Typography>
        </div>
        <Typography
          as="bold"
          element="p"
          className="h-[18px] text-[12px] font-medium leading-[17px] tracking-[0.03em] text-stone-950/50 md:w-[532px] md:text-primary"
        >
          {vendor.attributes.notification_email}
        </Typography>
      </div>
      <div className="flex h-[43px] flex-col gap-1 p-0 md:w-[532px] md:items-center md:justify-center">
        <div className="flex h-[21px] flex-row gap-1 p-0 md:w-[532px] md:items-center md:justify-center">
          <Typography
            as="bold"
            element="p"
            className="h-[21px] text-[14px] font-bold leading-[20px] tracking-[0.03em] text-bibinBlue-100 md:w-[532px]"
          >
            連絡先
          </Typography>
        </div>
        <Typography
          as="bold"
          element="p"
          className="h-[18px] text-[12px] font-medium leading-[17px] tracking-[0.03em] text-stone-950/50 md:w-[532px] md:text-primary"
        >
          {vendor.attributes.phone}
        </Typography>
      </div>
    </Card>
  );
};

export default VendorInfo;
