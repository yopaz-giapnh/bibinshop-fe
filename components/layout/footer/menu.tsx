import { Question } from '@/components/icons/question';
import { Shipping } from '@/components/icons/shipping';
import { User } from '@/components/icons/user';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';

export function Menu() {
  return (
    <div className="flex h-[114px] w-full items-center justify-center gap-5 bg-bibinBlue-100 pl-[16px] md:h-[194px] md:gap-16">
      <MenuItem href="/todo" icon={<Shipping />} label="配送について" />
      <Separator />
      <MenuItem href="/todo" icon={<Question />} label="サポート＆FAQ" />
      <Separator />
      <MenuItem href="/signup" icon={<User />} label="メンバー登録" />
    </div>
  );
}

function Separator() {
  return <div className="h-[100px] w-[1px] bg-white-30 md:h-[114px]" />;
}

function MenuItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} passHref>
      <div className="flex flex-col items-center ">
        {icon}
        <Typography
          as="title"
          element="h1"
          className="mt-2 text-[14px] text-white-base md:text-[26px]"
        >
          {label}
        </Typography>
      </div>
    </Link>
  );
}
