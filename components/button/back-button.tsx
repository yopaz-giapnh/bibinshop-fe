'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="md:hidden">
      <ChevronLeft className="h-7 w-7" />
    </button>
  );
};
