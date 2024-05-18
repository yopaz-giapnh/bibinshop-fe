import AccountSideBar from '@/features/account/components/side-bar';
import { PropsWithChildren } from 'react';

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full w-full">
      <AccountSideBar />
      {children}
    </div>
  );
}
