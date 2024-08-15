'use client';

import { Breadcrumb } from '@/components/layout/breadcrumb';
import AccountSideBar from '@/features/account/components/side-bar';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

const menus = [
  {
    name: 'ホーム',
    url: '/'
  },
  {
    name: 'プロフィール',
    url: '/account/profile'
  },
  {
    name: '注文履歴',
    url: '/account/order-history'
  },
  {
    name: 'お届け先住所',
    url: '/account/address'
  },
  {
    name: 'お支払い方法',
    url: '/account/payment'
  },
  {
    name: 'アカウントセキュリティ',
    url: '/account/security'
  },
  {
    name: 'メッセージ',
    url: '/account/message'
  }
];

interface Menu {
  name: string;
  url: string;
}

/**
 * ユーザーアカウント画面レイアウト
 * @returns JSX.Element
 */
export default function RootLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [breadcrumbMenus, setBreadcrumbMenus] = useState<Menu[]>([]);

  useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumb: Menu[] = [menus[0]];
    let currentPath = '';

    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const menu = menus.find((menu) => menu.url === currentPath);
      if (menu) {
        breadcrumb.push(menu);
      }
    });

    setBreadcrumbMenus(breadcrumb);
  }, [pathname]);

  return (
    <div className="h-full w-full pt-[73px] md:pt-[128px]">
      <div className="bg-paleFrostBlue px-[24px]">
        <Breadcrumb menus={breadcrumbMenus} />
      </div>
      <div className="flex bg-paleFrostBlue pb-[48px]">
        <div className="hidden md:block">
          <AccountSideBar />
        </div>
        {children}
      </div>
    </div>
  );
}
