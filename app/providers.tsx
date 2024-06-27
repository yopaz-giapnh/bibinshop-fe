'use client';

import { useIsPc } from '@/hooks/use-is-pc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren, useEffect } from 'react';

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
