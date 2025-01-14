import { RadioGroupItem } from '@/components/ui/radio-group';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

type PaymentMethodOptionProps = {
  /** RadioGroupItem に指定する value */
  labelKey: string;
  /** メインアイコン (PayPay / Store 等) */
  icon: React.ReactNode;
  /** ラジオボタンが選択されているか */
  isChecked: boolean;
  /** 表示名 ('PayPay' / 'コンビニ決済' 等) */
  title: string;
  /** コンビニ用の追加ロゴ群（任意） */
  konbiniLogos?: React.ReactNode;
};

/** PayPay や コンビニの決済オプション用コンポーネント */
export function PaymentMethodOption({
  labelKey,
  icon,
  isChecked,
  title,
  konbiniLogos
}: PaymentMethodOptionProps) {
  return (
    <label key={labelKey} className="cursor-pointer" htmlFor={labelKey}>
      <div
        className={cn(
          'flex w-[458px] items-center gap-4 rounded-[6px] border border-solid border-black-10 p-4',
          isChecked && 'border-bibinBlue-100 bg-[#F6FBFF]'
        )}
      >
        <RadioGroupItem value={labelKey} checked={isChecked} id={labelKey} />
        {icon}
        <div className="flex flex-col gap-2">
          <Typography as="body" element="p" className="text-black-80">
            {title}
          </Typography>
          {konbiniLogos && <div className="flex items-center gap-2">{konbiniLogos}</div>}
        </div>
      </div>
    </label>
  );
}
