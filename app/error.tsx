'use client';

import BibiSuprisedFace from '@/assets/bibincban/surprised-face.svg';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';

export default function Error() {
  return (
    <div className="mx-[49px] mt-32 flex flex-col items-center justify-center md:mt-60">
      <Typography as="title" element="h1" className="mb-[24px]">
        エラー
      </Typography>
      <BibiSuprisedFace />
      <Typography as="caption" element="p" className="mt-[24px] text-[16px]">
        申し訳ございません。エラーが発生しました。
      </Typography>
      <Link href="/" className="mb-[80px] mt-[24px]" passHref>
        <Button size="lg" variant="lg" type="button" className="w-[220px] md:w-[392px]">
          ホームに戻る
        </Button>
      </Link>
    </div>
  );
}
