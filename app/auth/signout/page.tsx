'use client';

import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { logout } from '@/features/auth/actions';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="h-full w-full items-center bg-paleFrostBlue">
      <div className="mx-auto flex h-screen w-full flex-col items-center pt-[128px]">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    </div>
  );
}
