import { Typography } from '@/components/ui/typography';
import { Bell, CreditCard, FileText, MapPin, ShieldPlus, UserRound } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface SideNavButtonProps {
  href: string;
  icon: ReactNode;
  label: string;
}

export default async function AccountSideBar() {
  const sideNavButtons: SideNavButtonProps[] = [
    {
      href: '/account/profile',
      icon: <UserRound className="h-6 w-6" color="black" />,
      label: 'プロフィール'
    },
    { href: '/', icon: <FileText className="h-6 w-6" color="black" />, label: '注文履歴' },
    { href: '/', icon: <MapPin className="h-6 w-6" color="black" />, label: 'お届け先住所' },
    { href: '/', icon: <CreditCard className="h-6 w-6" color="black" />, label: 'お支払い方法' },
    {
      href: '/',
      icon: <ShieldPlus className="h-6 w-6" color="black" />,
      label: 'アカウントセキュリティ'
    },
    { href: '/', icon: <Bell className="h-6 w-6" color="black" />, label: 'お知らせ' }
  ];

  const SideNavButton = ({ href, icon, label }: SideNavButtonProps) => (
    <Link href={href} passHref>
      <button
        type="button"
        className="mt-[16px] flex w-[275px] items-center rounded-[6px] border border-gray-300 bg-white-base p-[24px]"
      >
        {icon}
        <Typography as="bold" element="p" className="ml-[16px] text-[16px] text-black-90">
          {label}
        </Typography>
      </button>
    </Link>
  );

  return (
    <div className="mt-[128px] flex w-[400px] flex-col items-center bg-paleFrostBlue pl-[24px]">
      {sideNavButtons.map((button) => (
        <SideNavButton
          key={button.label}
          href={button.href}
          icon={button.icon}
          label={button.label}
        />
      ))}
    </div>
  );
}
