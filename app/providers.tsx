'use client';

import RegistrationCompleteModal from '@/features/auth/components/registration-complete-modal';
import { useIsPc } from '@/hooks/use-is-pc';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren, useEffect } from 'react';

export function Providers({ children }: PropsWithChildren) {
  const isPc = useIsPc();

  // ピンチイン、ピンチアウトを無効にする処理
  useEffect(() => {
    if (isPc) return;
    const handleGestureStart = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener('gesturestart', handleGestureStart);

    return () => {
      document.removeEventListener('gesturestart', handleGestureStart);
    };
  }, [isPc]);

  return (
    <SessionProvider>
      <>
        {children}
        <RegistrationCompleteModal />
      </>
    </SessionProvider>
  );
}
