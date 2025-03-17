'use client';

import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { logout } from '@/features/auth/actions';
import { useIsPc } from '@/hooks/use-is-pc';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import {
  Bell,
  CircleDollarSign,
  CreditCard,
  FileText,
  History,
  LogOut,
  MapPin,
  ShieldPlus,
  Ticket,
  UserRound,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import OrderHistoryTooltip from '@/features/account/order-history/components/order-history-tooltip';

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

  const sideNavTopButtons: SideNavButtonProps[] = [
    {
      href: '/account/order-history',
      icon: <FileText className="h-6 w-6" color="white" />,
      label: '注文履歴'
    },
    {
      href: '/account/coupon',
      icon: <Ticket className="h-6 w-6" color="white" />,
      label: 'クーポン'
    },
    {
      href: '/account/point-balance',
      icon: <CircleDollarSign className="h-6 w-6" color="white" />,
      label: 'ポイント残高'
    }
  ];

  const sideNavButtons: SideNavButtonProps[] = [
    {
      href: '/account/profile',
      icon: <UserRound className="h-6 w-6" color="black" />,
      label: 'プロフィール'
    },
    ...(isPc
      ? [
          {
            href: '/account/order-history',
            icon: <FileText className="h-6 w-6" color="black" />,
            label: '注文履歴'
          }
        ]
      : []),
    ...(isPc
      ? [
          {
            href: '/account/coupon',
            icon: <FileText className="h-6 w-6" color="black" />,
            label: 'クーポン'
          }
        ]
      : []),
    ...(isPc
      ? [
          {
            href: '/account/point-balance',
            icon: <CircleDollarSign className="h-6 w-6" color="black" />,
            label: 'ポイント残高'
          }
        ]
      : []),
    {
      href: '/account/browse-products',
      icon: <History className="h-6 w-6" color="black" />,
      label: '閲覧履歴'
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
      <div className="mt-[16px]">
        <Link href={href} passHref className="block w-full md:w-fit">
          <motion.button
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            type="button"
            className={clsx(
              'flex w-full items-center rounded-[6px] bg-white-base p-[24px] md:w-[275px]',
              isActive
                ? 'border-[2px] border-bibinBlue-100 bg-bibinBlue-10'
                : 'border-[1px] border-gray-300'
            )}
          >
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              {icon}
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              {label === '注文履歴' ? (
                <OrderHistoryTooltip isPc={true} />
              ) : (
                <Typography as="bold" element="p" className="ml-[16px] text-[16px] text-black-90">
                  {label}
                </Typography>
              )}
            </motion.div>
          </motion.button>
        </Link>
      </div>
    );
  };

  const SideNavTopButton = ({ href, icon, label }: SideNavButtonProps) => {
    return (
      <div className="mb-10 flex w-full flex-col items-center justify-center">
        <Link href={href} passHref>
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            type="button"
            className="rounded-full bg-bibinBlue-100 p-[24px]"
          >
            {icon}
          </motion.button>
        </Link>
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
          {label === '注文履歴' ? (
            <OrderHistoryTooltip isPc={false} />
          ) : (
            <Typography as="bold" element="p" className="pt-[8px] text-[16px] text-black-90">
              {label}
            </Typography>
          )}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="w-full flex-col items-center bg-paleFrostBlue md:w-[400px] md:pl-[24px]">
      <div className="flex w-full pt-4 md:hidden">
        {sideNavTopButtons.map((button) => (
          <SideNavTopButton
            key={button.label}
            href={button.href}
            icon={button.icon}
            label={button.label}
          />
        ))}
      </div>
      {sideNavButtons.map((button) => (
        <SideNavButton
          key={button.label}
          href={button.href}
          icon={button.icon}
          label={button.label}
        />
      ))}
      <form action={logout} className="md:hidden">
        <LogoutButton />
      </form>
    </div>
  );
}

function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        'mt-[16px] flex w-full items-center rounded-[6px] border-[1px] border-gray-300 bg-white-base p-[24px] md:w-[275px]'
      )}
    >
      {pending ? (
        <LoadingSpinner />
      ) : (
        <>
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
            <LogOut className="h-6 w-6" color="black" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
            <Typography as="bold" element="p" className="ml-[16px] text-[16px] text-black-90">
              サインアウト
            </Typography>
          </motion.div>
        </>
      )}
    </motion.button>
  );
}
