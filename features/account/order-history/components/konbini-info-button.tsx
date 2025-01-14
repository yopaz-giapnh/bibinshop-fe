import { Typography } from '@/components/ui/typography';
import Link from 'next/link';

type Props = {
  orderNumber: string;
};

export function KonbiniInfoButton({ orderNumber }: Props) {
  return (
    <Link href={`/account/orders/${orderNumber}`} passHref>
      <button
        type="button"
        className="mt-[8px] flex w-[222px] items-center justify-center rounded-[100px] border-[1px] border-bibinBlue-100 py-[8px]"
      >
        <Typography as="bold" element="p" className="ml-[8px] text-[14px] text-bibinBlue-100">
          支払いコードを確認する
        </Typography>
      </button>
    </Link>
  );
}
