'use client';

import RegistrationCompleteModal from '@/features/auth/components/registration-complete-modal';
import { CouponProvider } from '@/features/coupon/components/coupon-ctx';
import { PointProvider } from '@/features/point-balance/components/point-ctx';
import { I18nProvider } from '@/lib/i18n';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren, useEffect } from 'react';

export function Providers({ children }: PropsWithChildren) {
  // ピンチイン、ピンチアウトを無効にする処理
  useEffect(() => {
    const handleGestureStart = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener('gesturestart', handleGestureStart);

    return () => {
      document.removeEventListener('gesturestart', handleGestureStart);
    };
  }, []);

  return (
    <SessionProvider>
      <I18nProvider>
        <CouponProvider>
          <PointProvider>
            {children}
            <RegistrationCompleteModal />
          </PointProvider>
        </CouponProvider>
      </I18nProvider>
    </SessionProvider>
  );
}
