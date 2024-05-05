'use client';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';

// TODO: デザイン
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Typography as="title" element="h1">
        お探しのページが見つかりません
      </Typography>
      <Link href="/" className="mt-10" passHref>
        <Button type="button">ホームへ戻る</Button>
      </Link>
    </div>
  );
}
