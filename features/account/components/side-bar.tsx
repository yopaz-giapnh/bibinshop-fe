'use client';

import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { logout } from '@/features/auth/actions';
import { useIsPc } from '@/hooks/use-is-pc';
import clsx from 'clsx';
import {
  Bell,
  CreditCard,
  FileText,
  LogOut,
  MapPin,
  ShieldPlus,
  UserRound,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

interface SideNavButtonProps {
  href: string;
  icon: ReactNode;
  label: string;
}

/**
 * アカウント管理画面の左サイドバー共通コンポーネント
 * @returns JSX.Element
 */
export default function AccountSideBar() {
  const pathname = usePathname();
  const isPc = useIsPc();

  const sideNavButtons: SideNavButtonProps[] = [
    {
      href: '/account/profile',
      icon: <UserRound className="h-6 w-6" color="black" />,
      label: 'プロフィール'
    },
    {
      href: '/account/order-history',
      icon: <FileText className="h-6 w-6" color="black" />,
      label: '注文履歴'
    },
    {
      href: '/account/address',
      icon: <MapPin className="h-6 w-6" color="black" />,
      label: 'お届け先住所'
    },
    {
      href: '/account/payment',
      icon: <CreditCard className="h-6 w-6" color="black" />,
      label: 'お支払い方法'
    },
    {
      href: '/account/security',
      icon: <ShieldPlus className="h-6 w-6" color="black" />,
      label: 'アカウントセキュリティ'
    },
    {
      href: '/account/message',
      icon: <Bell className="h-6 w-6" color="black" />,
      label: 'メッセージ'
    },
    {
      href: '/sns',
      icon: <Users className="h-6 w-6" color="black" />,
      label: 'bibin SNS'
    }
  ];

  const SideNavButton = ({ href, icon, label }: SideNavButtonProps) => {
    const isActive = pathname === href;

    return (
      <Link href={href} passHref>
        <button
          type="button"
          className={clsx(
            'mt-[16px] flex w-full items-center rounded-[6px] bg-white-base p-[24px] md:w-[275px]',
            isActive
              ? 'border-[2px] border-bibinBlue-100 bg-bibinBlue-10'
              : 'border-[1px] border-gray-300'
          )}
        >
          {icon}
          <Typography as="bold" element="p" className="ml-[16px] text-[16px] text-black-90">
            {label}
          </Typography>
        </button>
      </Link>
    );
  };

  return (
    <div className="w-full flex-col items-center bg-paleFrostBlue md:w-[400px] md:pl-[24px]">
      {sideNavButtons.map((button) => (
        <SideNavButton
          key={button.label}
          href={button.href}
          icon={button.icon}
          label={button.label}
        />
      ))}
      {!isPc && (
        <form action={logout}>
          <LogoutButton />
        </form>
      )}
    </div>
  );
}

function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={clsx(
        'mt-[16px] flex w-full items-center rounded-[6px] border-[1px] border-gray-300 bg-white-base p-[24px] md:w-[275px]'
      )}
    >
      {pending ? (
        <LoadingSpinner />
      ) : (
        <>
          <LogOut className="h-6 w-6" color="black" />
          <Typography as="bold" element="p" className="ml-[16px] text-[16px] text-black-90">
            サインアウト
          </Typography>
        </>
      )}
    </button>
  );
}
