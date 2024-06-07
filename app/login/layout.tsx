import * as session from '@/features/auth/utils/session';
import { redirectToTop } from '@/utils/navigation';
import { PropsWithChildren } from 'react';

export default async function RootLayout({ children }: PropsWithChildren) {
  const isSignedIn = await session.isSignedIn();
  if (isSignedIn) {
    return redirectToTop();
  }

  return children;
}
