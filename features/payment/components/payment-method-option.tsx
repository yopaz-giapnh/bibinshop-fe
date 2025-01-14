import { RadioGroupItem } from '@/components/ui/radio-group';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

type PaymentMethodOptionProps = {
  labelKey: string; // RadioGroupItem の value として使う文字列
  icon: React.ReactNode; // PayPay, Storeなどのアイコン
  title: string; // 表示ラベル
  isChecked: boolean; // ラジオボタンが選択状態かどうか
  // コンビニ用に複数のロゴを追加表示する場合のみ渡す
  konbiniLogos?: React.ReactNode;
};

/**
 * PayPay or コンビニ の表示
 */
export function PaymentMethodOption({
  labelKey,
  icon,
  title,
  isChecked,
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
