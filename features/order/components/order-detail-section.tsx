import { Typography } from '@/components/ui/typography';

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

/**
 * 注文内容各項目の枠組みコンポーネント
 * @returns JSX.Element
 */
export default function OrderDetailSection({ title, children }: SectionProps) {
  return (
    <div className="mt-[16px] items-center justify-between rounded-[6px] border-b-[1px] bg-white-base px-[24px] py-[16px] shadow-base">
      <Typography as="bold" element="p" className="text-[20px] text-black-90">
        {title}
      </Typography>
      {children}
    </div>
  );
}
