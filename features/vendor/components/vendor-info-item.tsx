import { Typography } from '@/components/ui/typography';

type VendorInfoItemProps = {
  label: string;
  value?: string | null;
};

export const VendorInfoItem = ({ label, value }: VendorInfoItemProps) => {
  if (!value) return null;

  return (
    <div className="flex h-[43px] flex-col gap-1 p-0 md:w-[532px] md:items-center md:justify-center">
      <div className="flex h-[21px] flex-row gap-1 p-0 md:w-[532px] md:items-center md:justify-center">
        <Typography
          as="bold"
          element="p"
          className="h-[21px] text-[14px] font-bold leading-[20px] tracking-[0.03em] text-bibinBlue-100 md:w-[532px]"
        >
          {label}
        </Typography>
      </div>
      <Typography
        as="bold"
        element="p"
        className="h-[18px] text-[12px] font-medium leading-[17px] tracking-[0.03em] text-stone-950/50 md:w-[532px] md:text-primary"
      >
        {value}
      </Typography>
    </div>
  );
};
