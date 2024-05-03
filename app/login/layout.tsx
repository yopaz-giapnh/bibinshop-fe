import * as session from '@/features/auth/utils/session';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function RootLayout({ children }: PropsWithChildren) {
  const isSignedIn = await session.isSignedIn();
  if (isSignedIn) {
    redirect('/');
  }

  return children;
}
