import { Question } from '@/components/icons/question';
import { Shipping } from '@/components/icons/shipping';
import { User } from '@/components/icons/user';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';

export function Menu() {
  return (
    <div className="flex h-[194px] items-center justify-center gap-16 bg-bibinBlue-100">
      <MenuItem href="/todo" icon={<Shipping />} label="送料無料" />
      <Separator />
      <MenuItem href="/todo" icon={<Question />} label="サポート＆FAQ" />
      <Separator />
      <MenuItem href="/signup" icon={<User />} label="メンバー登録" />
    </div>
  );
}

function Separator() {
  return <div className="h-[114px] w-[1px] bg-white-30" />;
}

function MenuItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href}>
      <div className="flex flex-col items-center">
        {icon}
        <Typography as="title" element="h1" className="mt-2 text-white-base">
          {label}
        </Typography>
      </div>
    </Link>
  );
}
