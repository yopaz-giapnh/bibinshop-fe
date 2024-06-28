'use client';

import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { authenticateFromToken } from '@/features/auth/actions';
import { isString } from '@/utils/string';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function Page({
  searchParams
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const confirmationToken = searchParams.confirmation_token;
  const loadedRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (loadedRef.current) {
      return;
    }
    loadedRef.current = true;

    const confirm = async () => {
      if (isString(confirmationToken)) {
        await authenticateFromToken(confirmationToken);
        router.replace('/?registration=complete');
      }
    };
    confirm();
  }, [confirmationToken, router]);

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
